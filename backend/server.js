require('dotenv').config({
  path: './backend/.env'
})
const app = require('./app')
const mongoose = require('mongoose')

console.log('server', process.env.NODE_ENV)

const PORT = process.env.PORT || 4000
// const DB = process.env.LOCAL_DB

const DB2 = process.env.CLOUD_DB

mongoose
  .connect(DB2)
  .then(() => {
    console.log('connected to the database successfully')
  })
  .catch((err) => console.log(err))

app.listen(PORT, () => {
  console.log(`application started on port ${PORT}`)
})
