const express = require('express')
const app = express()

//rotas
const index = require('./routes/index')
const alunas = require('./routes/alunasRoute')
const professoras = require('./routes/professorasRoute')

app.all('*', function(req, res, next){ //exemplo de aplicação: verificar quantidade de acessos
    console.log('Passando pelo app')
    next() // next = passa para a próxima aplicação.
})

app.use('/', index)
app.use('/alunas', alunas)
app.use('/professoras', professoras)

module.exports = app