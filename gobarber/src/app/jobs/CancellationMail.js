import {format, parseISO} from 'date-fns'
import Mail from '../../lib/Mail'
import pt from 'date-fns/locale/pt'


class CancellationMail{

  get key(){
    key: 'CancellationMail'
  }

  async handle({data}){

    const {appointment} = data

    await Mail.sendMail({
      to: `${appointment.provider.name}<${appointment.provider.email}>`,
      subject: 'Agendamento Cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(parseISO(appointment.date),
          "'dia ' dd' de ' MMMM', as ' H:mm'h'",
          {locale: pt}
        )
      }
    })
  }
}

export default new CancellationMail()
