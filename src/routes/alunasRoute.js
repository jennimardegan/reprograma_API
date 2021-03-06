const express = require('express')
const router = express.Router()
const controller = require('../controllers/alunasController')

router.get('/', controller.get)
router.get('/nasceuSp', controller.getSp) //incluído por último, mas é necessário estar na ordem de busca
router.get('/:id', controller.getById) //:id = "criando" uma variável
router.get('/:id/idade', controller.getIdade)
router.get('/:id/books', controller.getBooks)
router.post('/', controller.post)
router.post('/:id/books', controller.postBooks)

module.exports = router