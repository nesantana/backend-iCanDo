require('dotenv').config()
const express = require('express')
const app = express()
const mongosse = require('mongoose')
const cors = require('cors')

const UserDB = process.env.BD_USER
const PassDB = encodeURIComponent(process.env.BD_PASSWORD)

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())

app.use('/user', require('./routes/userRoutes'))
app.use('/lists', require('./routes/listsRoutes'))

mongosse.connect(`mongodb+srv://${UserDB}:${PassDB}@cluster0.6aonm.mongodb.net/cluster0?retryWrites=true&w=majority`)
.then(() => {
  console.log('Estamos rodando!')
  app.listen(5000)
})
.catch((err) => console.log(err))