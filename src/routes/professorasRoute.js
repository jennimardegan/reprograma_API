const express = require('express')
const router = express.Router()
const controller = require('../controllers/professorasController')

router.get('/', controller.get) //não tem problema utilizar a mesma função para alunas e professoras pq são rotas diferentes

module.exports = router