import nodemailer from 'nodemailer'
import mailConfig from '../config/mail'
import {resolve} from 'path'
import {create} from 'express-handlebars'
import nodemailerhbs from 'nodemailer-express-handlebars'

class Mail{
  constructor(){

    const {host, port, secure, auth} = mailConfig
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null
    })

    this.configureTemplates()
  }

  configureTemplates(){
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails' )

    const exphbsCreate = create({
      layoutsDir: resolve(viewPath, 'layouts'),
      partialsDir: resolve(viewPath, 'partials'),
      defaultLayout: 'default',
      extname: '.hbs'
    })

    this.transporter.use('compile', nodemailerhbs({
      viewEngine: exphbsCreate,
      viewPath,
      extName: '.hbs'
    }))
  }

  sendMail(message){
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message
    })
  }
}

export default new Mail()
