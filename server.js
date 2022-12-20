//creating an instance of all the dependencies
const express = require('express')
const {sequelize} = require('./models')
const app = express()
const cors = require('cors')
const router = express.Router()
// const cookieParser = require('cookie-parser')
// const session = require('express-session')
const bodyParser = require('body-parser')
// const verifyJWT = require('./middleware/authenticate')
require('dotenv').config('./.env')



//communication between the front and back end
app.use(cors())

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.json())
require('./routes/route')(app,router)


//Syncing with sequelize and dropping all existing files
const port = process.env.PORT || 5000
app.listen({ port}, async () => {
    console.log(`Server is up and running on port ${port}`)
    await sequelize.sync({alter: true})
    console.log('sever is synced')
})