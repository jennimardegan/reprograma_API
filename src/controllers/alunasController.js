const alunas = require('../model/alunas.json')

exports.get = (req, res) => {
    console.log(req.url)
    res.status(200).send(alunas)
}

exports.getById = (req, res) => {
    const id = req.params.id
    console.log(id)
    if (id > 17 || id <= 0) {
        res.redirect(301, "https://www.mercadolivre.com.br/") //possível usar o redirect no lugar de send para redirecionar para erro
    }
    res.status(200).send(alunas.find(aluna => aluna.id == id))
}

exports.getBooks = (req, res) => {
    const id = req.params.id
    const aluna = alunas.find(aluna => aluna.id == id)
    if(!aluna) {
        res.send('Não encontrei esta aluna')
    }
    const livrosAluna = aluna.livros //criação de uma array
    const tituloLivros = livrosAluna.map(livro => livro.titulo)

    res.status(200).send(tituloLivros)
}

exports.getSp = (req, res) => {
    const nasceuSp = alunas.filter(aluna => aluna.nasceuEmSp == "true") 
    const meninasSp = nasceuSp.map(aluna => aluna.nome)
    
    res.status(200).send(meninasSp)
}