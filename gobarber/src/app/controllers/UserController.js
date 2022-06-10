import User from "../models/User";

import server from '../../server'

class UserController{
  async store(req, res,next){

    const existEmail = await User.findOne({where: {email:req.body.email}})

    if(existEmail){
      return res.status(400) , res.json({"Error": "Email already exists"})
    }

    const user = await User.create(req.body)
    return res.json(user)


  }
}

export default new UserController;
