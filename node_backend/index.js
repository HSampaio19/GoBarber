const express = require('express');

// cria um instancia do servidor utilizando o express
const server = express();

// diz ao express que as informacoes do body das requisicoes estao no formato JSON
server.use(express.json());

const users = ['Higor' , 'Thais' , 'Alice']

server.get( '/users/:index', (req , res) => {
    const index = req.params.index
    return res.json(`Nome do usuario: ${users[index]}`);
})

server.get('/users/', (req,res) => {
    return(res.json(users))
})

server.post('/users/' , (req,res) => {
    const nome = req.body.nome
    users.push(nome)

    return(res.json(users))
})

server.listen(3000);


// =========================================================================================================================================================

// Dados de requisicoes (req)
// Query params = ?teste=1
// atravez da propriedade query do parametro req e possivel capturar o valor da requisicao passado por parametro query(nome) ("Query params = ?teste=1")
// const nome = req.query.nome; 


// Route params = /user/1
// atravez da propriedade params do parametro req e possivel capturar o valor da requisicao passado por parametro de rota(id) (Route params = /user/1)
// const id = req.params.id; 

// Request body = { "name: : Higor" , email: "higor_sampaio@hotmail.com"}

// metodo get utilizado para realizar uma requisicao para o backend
// parametros "req" envia as informacoes para a consulta no backend e "res" armazeda a resposta recebida pelo backend