import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

export default async(req, res, next) => {
  const authHeader = req.headers.authorization

  if(!authHeader){
    return res.status(401).json({Error: 'Token not provider'})
  }

  const [bearer, token] = authHeader.split(' ')

  try{
    // funcao verify retorna o conteudo enviado na criacao do token jwt (ID) descriptado, utilizando o token e o segredo utilizado para gerar o token
    const decoded = jwt.verify(token, authConfig.secret);

    req.userId = decoded.id
  }catch(error){
    res.status(401).json({Error: "Authentication token desn't match"})
  }

 return next()
}

