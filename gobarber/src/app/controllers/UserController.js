import User from "../models/User";
import * as Yup from 'yup'
import File from "../models/File";
class UserController{
  async store(req, res){

    const schema = Yup.object().shape({
      name: Yup.string()
      .required(),
      email: Yup.string()
      .email()
      .required(),
      password: Yup.string()
      .required()
      .min(6)
    })

    if(!await schema.isValid(req.body)){
      return res.status(400).json({Error: 'Validation fails'})
    }

    const userExists = await User.findOne({where: {email:req.body.email}})

    if(userExists){
      return res.status(400) , res.json({"Error": "Email already exists"})
    }

    const {id , name , email , provider} = await User.create(req.body)
    return res.json({
      id,
      name,
      email,
      provider,
    })
  }

  async update(req, res){

    const schema = Yup.object().shape({
      name: Yup.string()
      .required(),
      email: Yup.string()
      .email()
      .required(),
      oldPassword: Yup.string()
      .min(6),
      password: Yup.string()
      .min(6)
      .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
      confirmPassword: Yup.string()
      .when('password', (password, field)=>
      password ? field.required().oneOf([Yup.ref('password')]) : field
      )
    })

    if(!await schema.isValid(req.body)){
      return res.status(400).json({Error: 'Validation fails'})
    }

    const {email , oldPassword} = req.body;

    const user = await User.findByPk(req.userId)


    if(email && email != user.email){
      const userExists = await User.findOne({where: {email}})
      if(userExists){
        return res.status(401).json({Error: 'User already exists'})
      }
    }
    if(oldPassword && !await user.checkPassword(oldPassword)){
      return res.status(401).json({Error: "Password doesn't match"})
    }
    // a propriedade update utilizada a baixo e uma propriedade do modal User e nao a funcao update que foi criada

    await user.update(req.body)

    const {id, name, avatar} = await User.findByPk(req.userId,{
      include:[{
        model: File,
        as: 'avatar',
        attributes: ['id', 'path', 'url']
      }]
    })



    return res.json({
      id,
      name,
      email,
      avatar,
    })
  }
}

export default new UserController;
