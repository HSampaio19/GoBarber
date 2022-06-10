import User from "../models/User";

import server from '../../server'

class UserController{
  async store(req, res,next){
    const user = await User.create(req.body)
    return res.json(user)
  }
}

export default new UserController;
