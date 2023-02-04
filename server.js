const express =  require('express')
const endpoints = require('./routes/endpoints')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./html'))

const searchData = async (req, res, route) => {
  const { search } = req.body
   
  try {
    const data = await endpoints[route](search)
    console.log('log da resposta do server')
    console.log(data)
    res.send({ data: data })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

app.post('/candidates', (req, res) => searchData(req, res, 'candidates'))

app.post('/offices', (req, res) => searchData(req, res, 'offices'))

app.listen(8000, () => console.log('Funcionando'))
