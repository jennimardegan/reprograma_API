const alunas = require('../model/alunas.json')
const fs = require('fs'); //fs = file system, criado para podermos gravar as infos do POST

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

exports.getIdade = (req, res) => {
    const id = req.params.id
    const aluna = alunas.find(aluna => aluna.id == id) //item id da base de dados comparado ao id da linha anterior
    if(!aluna) {
        res.send('Não encontrei esta aluna')
    }
    const dataNascimento = aluna.dateOfBirth
    const arrData = dataNascimento.split('/')
    const dia = arrData[0]
    const mes = arrData[1]
    const ano = arrData[2]
    const idade = calcularIdade(ano, mes, dia)

    res.status(200).send({ idade })
}

    function calcularIdade(anoDeNasc, mesDeNasc, diaDeNasc) {
          const now = new Date()
          const anoAtual = now.getFullYear()
          const mesAtual = now.getMonth() + 1
          const hoje = now.getDate()
        
          let idade = anoAtual - anoDeNasc
        
          if (mesAtual < mesDeNasc || (mesAtual == mesDeNasc && hoje < diaDeNasc)) {
            idade -= 1
          }
          return idade
        }

exports.post = (req, res) => {
    const { nome, dateOfBirth, nasceuEmSp, id, livros } = req.body; //desestruturação do array nestes parâmetros
    alunas.push({ nome, dateOfBirth, nasceuEmSp, id, livros}); //adicionar por push estes itens no array json (base de dados)
    
    fs.writeFile("./src/model/alunas.json", JSON.stringify(alunas), 'utf8', function (err) {
        if (err) {
            return res.status(500).send({ message: err });
        }
        console.log("The file was saved!");
    });

/*writeFile = escrever no arquivo (deve ter o caminho absoluto do arquivo a ser manipulado para não dar erro)
stringify = transformar o arquivo em string para poder manipular e alterar as infos
utf8 = nomenclatura para entender e gravar com acentuações */

    return res.status(201).send(alunas); //201 para indicar que o arquivo original foi modificado
    }

    exports.postBooks = (req, res) => {
        const id = req.params.id
        const aluna = alunas.find(aluna => aluna.id == id)
        if (!aluna) {
            res.send("Não encontrei essa aluna")
        }
        const { titulo, leu } = req.body;
        alunas[aluna.id - 1].livros.push({ titulo, leu }); // [aluna.id - 1] pois estamos comparando a posição no array que inicia em 0 com o id que inicia em 1
                
        fs.writeFile("./src/model/alunas.json", JSON.stringify(alunas), 'utf8', function (err) {
            if (err) {
                return res.status(500).send({ message: err });
            }
            console.log("The file was saved!");
        });

        return res.status(201).send(alunas[aluna.id - 1].livros); // utiliza-se o return para garantir que nada será executado após esta linha
        }
