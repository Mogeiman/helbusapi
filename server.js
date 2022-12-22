//creating an instance of all the dependencies
const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const router = express.Router()
const bodyParser = require('body-parser')
require('dotenv').config('./.env')

const {sequelize} = require('./models')
const {Locations} = require('./models/locations')

const server = http.createServer(app);
const {Server} = require('socket.io')
const io = new Server(server)

//communication between the front and back end
app.use(cors({origin: true, methods: ['GET', 'POST', 'PUT', 'DELETE']}));

io.on('connection', async(socket) => {
    console.log('a user connected');
  
    const updatedLocations = await  Locations.findAll({
        attributes: ['id','latitude', 'longitude', 'UserId', 'user']
    })

    socket.on('send_locations', (msg) => {
      console.log('location: ' + msg);
      io.emit('receive_locations', updatedLocations);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });




app.use(bodyParser.urlencoded({extended:true}))

app.use(express.json())
app.use(router)
require('./routes/route')(app,router)


//Syncing with sequelize and dropping all existing files
const port = process.env.PORT || 5000
server.listen({ port}, async () => {
    console.log(`Server is up and running on port ${port}`)
    await sequelize.sync({alter: true})
    console.log('sever is synced')
})