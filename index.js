const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const connection = require('./mysqlFile')
const db = require('mysql').createPool(connection)

app.use(express.json())
app.use('/public', express.static('public'))
app.set('view engine', '.hbs')

const validate = require('./validation')

app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main', extname: 'hbs'
}))

app.get('/', (req, res) => {
  res.status(200).render('home')
})

app.post('/usuarios', (req, res) => {
  const cliente = { ...req.body }
  try {
    validate().existsOrError(cliente.usuario, 'Nome não informado')
    validate().existsOrError(cliente.senha, 'Senha não informada')
    validate().characterCheck(cliente.usuario, 'Nome com caracteres inválidos.')
    validate().characterCheck(cliente.senha, 'Senha com caracteres inválidos.')
    validate().equalsOrError(cliente.senha, cliente.validateSenha, 'Senhas não conferem!')
    validate().lengthMin(cliente.senha, 'Senha com mínimo de 8 caracteres.', Number(8))
    db.query(`SELECT * FROM morseUsuario
      WHERE nome = '${cliente.usuario}'`, (error, email) => {
      if (error) return res.status(500).send(error.sqlMessage)
      if (email[0]) return res.status(400).send('Nome já cadastrado')
      db.query(`INSERT INTO morseUsuario (nome, senha) 
      VALUES ('${cliente.usuario}', '${cliente.senha}')`, (error) => {
        if (error) return res.status(500).send(error.sqlMessage)
        res.status(200).send()
      })
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

app.post('/save', (req, res) => {
  const body = { ...req.body }
  try {
  db.query(`INSERT INTO morseHistorico
    (id_linguagem_selecionada, id_linguagem_traduzida, conteudo_selecionado, usuario_id)
    VALUES
    ('${body.linguagemSelecionada}', '${body.linguagemTraduzida}', '${body.conteudoSelecionado}', '${body.usuarioId}')`, (error) => {
      if (error) return res.status(500).send(error.sqlMessage)
      res.status(200).send()
    })
    } catch (error) {
    res.status(400).json(error)
  }
})

app.delete('/save', (req, res) => {
  const body = { ...req.body }  
  try {
  var selectSql = `SELECT * FROM morseHistorico WHERE id = '${body.idHistorico}'`
  db.query({
  sql: selectSql,
  timeout: 40000, // 40s
}, (erro, results) => {
  if (erro) return res.status(500).send(erro)
    db.query(`DELETE FROM morseHistorico WHERE id = ${results[0].id}`, (error, result) => {
    if (error) return res.status(500).send(error)
    res.status(200).send()
  })
})
} catch (error) {
    res.status(400).json(error)
  }
})

app.post('/signins', (req, res) => {
  try {
    if (!req.body.usuario || !req.body.senha) throw { error: 'Usuario ou senha não informado!' }
    db.query(`SELECT * FROM morseUsuario
    WHERE nome = '${req.body.usuario}'
    AND senha = ${req.body.senha}`, (error, cliente) => {
      if (error) return res.status(500).json({ error: error.sqlMessage })
      if (!cliente[0]) return res.status(400).json({ error: 'Email ou senha inválido!' })
      db.query(`SELECT * FROM morseHistorico
    WHERE usuario_id = '${cliente[0].id}' ORDER BY morseHistorico.data_hora DESC`, (erro, clienteHistorico) => {
      if (erro) return res.status(500).json({ error: erro.sqlMessage })
      if (!clienteHistorico[0]) return res.status(200).json([cliente[0]])
      res.status(200).json([cliente, clienteHistorico])
      })
    })
  } catch (error) {
    res.status(400).json(error)
  }
})

app.post('/signins', (req, res) => {
  try {
    if (!req.body.usuario || !req.body.senha) throw { error: 'Usuario ou senha não informado!' }
    db.query(`SELECT * FROM morseUsuario
    WHERE nome = '${req.body.usuario}'
    AND senha = ${req.body.senha}`, (error, cliente) => {
      if (error) return res.status(500).json({ error: error.sqlMessage })
      if (!cliente[0]) return res.status(400).json({ error: 'Email ou senha inválido!' })
      res.status(200).json(cliente)
    })
  } catch (error) {
    res.status(400).json(error)
  }
})

app.post('/save', (req, res) => {
  try {
    if (!req.body.usuario || !req.body.senha) throw { error: 'Usuario ou senha não informado!' }
    db.query(`SELECT * FROM morseUsuario
    WHERE nome = '${req.body.usuario}'
    AND senha = ${req.body.senha}`, (error, cliente) => {
      if (error) return res.status(500).json({ error: error.sqlMessage })
      if (!cliente[0]) return res.status(400).json({ error: 'Email ou senha inválido!' })
      res.status(200).json(cliente)
    })
  } catch (error) {
    res.status(400).json(error)
  }
})

app.listen(3000, () => {
  console.log("Site ativo")
})
//background: linear-gradient(130deg,#ff7a18,#af002d 41.07%,#319197 76.05%);
//#990033 COR PARA A SELEÇÃO DO MOUSE
//LINKS DE IMAGENS
/*
https://st2.depositphotos.com/4499099/6644/i/600/depositphotos_66446253-stock-photo-telegraph-machine-morse-code.jpg
https://media.istockphoto.com/photos/telegraph-picture-id157683170?b=1&k=20&m=157683170&s=170667a&w=0&h=46oVRSkqrwi1Q1JcxdNUhzEFtha8g0Fy5NubQ-wCqvw=
https://www.cliccamaqua.com.br/images/noticias/img_53982_foto_1_a.jpg
https://images.freeimages.com/images/large-previews/37f/old-typewriter-and-typist-1167422.jpg */
/*LINKS PARA ESTUDO
https://encycolorpedia.pt/cca978
https://developer.mozilla.org/pt-BR/docs/Web/CSS/box-shadow
https://www.w3schools.com/cssref/tryit.asp?filename=trycss3_box-shadow
https://userstyles.org/styles/175290/clean-discordhttps://www.uniftc.edu.br/salvador/home/ */