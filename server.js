const express =  require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./html'))

app.post('/candidates', async (req, res) => {
  const { search } = req.body 
  
  console.log(search)
  
  res.send( { value: search })
})

app.listen(8000, () => console.log('Funcionando'))
