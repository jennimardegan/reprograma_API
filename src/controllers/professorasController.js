
const professoras = require('../model/professoras.json')

exports.get = (req, res) => {
    console.log(req.url)
    res.status(200).send(professoras)
}