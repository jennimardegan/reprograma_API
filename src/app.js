const express = require('express')
const app = express()

//rotas
const index = require('./routes/index')
const alunas = require('./routes/alunasRoute')
const professoras = require('./routes/professorasRoute')

app.use(express.json()); //no momento de fazer o POST, esta linha irá traduzir a informação recebida pelo servidor para json

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*") // adicionado para funcionar exemplo site (reprograma)
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use('/', index)
app.use('/alunas', alunas)
app.use('/professoras', professoras)

module.exports = app