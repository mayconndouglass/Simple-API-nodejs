const express =  require('express')
const endpoints = require('./routes/endpoints')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./html'))

app.post('/candidates', async (req, res) => {
  const { search } = req.body
   
  try {
    const data = await endpoints.searchCandidates(search)

    res.send({ data: data })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

app.listen(8000, () => console.log('Funcionando'))
