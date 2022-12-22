//creating an instance of all the dependencies
const express = require('express')
const {sequelize} = require('./models')
const {Locations} = require('./models/locations')
const app = express()
const cors = require('cors')
const router = express.Router()
const bodyParser = require('body-parser')
require('dotenv').config('./.env')



const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: true}});

//communication between the front and back end
app.use(cors({origin: true, credentials: true}));

io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    // const updatedLocations = await  Locations.findAll({
    //     attributes: ['id','latitude', 'longitude', 'UserId', 'user']
    // })

    socket.on('locations', (msg) => {
      console.log('location: ' + msg);
      io.emit('locations', updatedLocations);
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