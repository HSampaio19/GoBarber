import Appointment from "../models/Appointment";
import {startOfHour, parseISO, isBefor, isBefore, format} from 'date-fns'
import pt from 'date-fns/locale/pt'
import User from "../models/User";
import File  from "../models/File";
import * as Yup from 'yup';
import Notification from '../schemas/notification';

class AppointmentController{

  async index(req, res){

    const {page} = req.query;

    const appointments = await Appointment.findAll({
      where:{
        user_id: req.userId,
        canceled_at: null,
      },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      include:[{
        model: User,
        as: 'provider',
        attributes: ['name'],
        include:[{
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url']
        }]
      }]
    })
    return res.json(appointments)
  }

  async store(req, res){

    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    })

    if((!await schema.isValid(req.body))){
      return res.status(400).json({error: "Validation fails"})
    }

    const {provider_id, date} = req.body

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true}
    })

    if(!isProvider){
      return res.status(401).json({erro: "The professional selected isn't a provider"})
    }

    if(isProvider.id === req.userId){
      return res.status(401).json({erro: "You can not create a appointment with you"})
    }

    const hourstart = startOfHour(parseISO(date));

    if(isBefore(hourstart, new Date)){
      return res.status(400).json({erro: "Past dates are not permitted"})
    }

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourstart}
    })

    if(checkAvailability){
      return res.status(400).json({error: "Appointment date is not available"})
    }



    const appointment = await Appointment.create({
        user_id: req.userId,
        provider_id,
        date: date
    })

    //Provider Appointment notification

    const user = await User.findByPk(req.userId)
    const formattedDate = format(
      appointment.date,
      "'dia ' dd' de ' MMMM', as ' H:mm'h'",
      {locale: pt}
    )

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    })


    return res.json(appointment)
  }

}

export default new AppointmentController()