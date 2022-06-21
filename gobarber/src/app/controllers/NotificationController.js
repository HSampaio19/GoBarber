import User from "../models/User";
import Notification from "../schemas/notification";

class NotificationController{
  async index(req, res){

    const isProvider = await User.findOne({
      where: {id: req.userId, provider:true}
    })

    if(!isProvider){
      return res.status(400).json({error: 'Current user is not a provider'})
    }

    const notifications = await Notification.find({
      user: req.userId
    })
    .sort({createdAt: 'desc'})
    .limit(20)

    res.json(notifications)
  }

  async update(req, res){

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {read: true},
      {new: true},
    )
    return res.json(notification)
  }
}

export default new NotificationController()
