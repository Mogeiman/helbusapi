//creating an instance of all the dependencies
const express = require('express')
const {sequelize} = require('./models')
const app = express()
const cors = require('cors')
const router = express.Router()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
// const verifyJWT = require('./middleware/authenticate')
const path = require('path')
require('dotenv').config('./.env')



//Have no Idea
global.__basedir=__dirname

//communication between the front and back end
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET","POST"],
    credentials: true
}))

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
//Session
app.use(session({
    key: "userId",
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: 60*60*24,
    }

}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/client/build/')))
require('./routes/route')(app,router)


//Syncing with sequelize and dropping all existing files
const port = process.env.PORT || 5000
app.listen({ port}, async () => {
    console.log(`Server is up and running on port ${port}`)
    await sequelize.sync({alter: true})
    console.log('sever is synced')
})