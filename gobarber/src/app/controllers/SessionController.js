import User from "../models/User";
import * as Yup from 'yup'
import authConfig from "../../config/auth";

import jwt from 'jsonwebtoken';

class SessionController{
  async store(req, res){

    const schema = Yup.object().shape({
      email: Yup.string()
      .email()
      .required(),
      password: Yup.string()
      .required()
    })

    if(!await schema.isValid(req.body)){
      return res.status(400).json({Error: 'Validation fails'})
    }

    const {email , password} = await req.body

    const user = await User.findOne({where: {email : email}})
    if(!user){
      return res.status(401) , res.json({"Error": "User not found"})
    }
    if(!await user.checkPassword(password)){
      return res.status(401), res.json({"Error": "Password doesn't match"})
    }

    const {id, name} = user
      return res.json({
        user:{
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn
        })
      })
  }
}

export default new SessionController;
