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


const getLocations = async () => {
    try {
      const locations = await Locations.findAll({
        attributes: ['id','latitude', 'longitude', 'UserId', 'user']
    });
      return locations;
    } catch (error) {
      console.error(error);
    }
  };




// const locations = [
//     {
//         "id": 1,
//         "latitude": "9.583833",
//         "longitude": "44.027833",
//         "UserId": 1,
//         "user": "imam@gmail.com"
//     },
//     {
//         "id": 2,
//         "latitude": "9.58438",
//         "longitude": "44.027734",
//         "UserId": 2,
//         "user": "abdi@gmail.com"
//     },
//     {
//         "id": 3,
//         "latitude": "9.584959",
//         "longitude": "44.027678",
//         "UserId": 3,
//         "user": "ciise@gmail.com"
//     },
//     {
//         "id": 4,
//         "latitude": "9.585001",
//         "longitude": "44.028606",
//         "UserId": 4,
//         "user": "cawad@gmail.com"
//     },
//     {
//         "id": 5,
//         "latitude": "9.584554",
//         "longitude": "44.029022",
//         "UserId": 5,
//         "user": "canfar@gmail.com"
//     },
//     {
//         "id": 6,
//         "latitude": "9.584232",
//         "longitude": "44.028703",
//         "UserId": 6,
//         "user": "curad@gmail.com"
//     },
//     {
//         "id": 7,
//         "latitude": "9.584557529997507",
//         "longitude": "44.02820586999986",
//         "UserId": 7,
//         "user": "imuush@gmail.com"
//     }
// ]
io.on('connection', (socket) => {
    console.log('a user connected');
    const locations = getLocations();
    socket.on('send_locations', (msg) => {
      console.log('location: ' + msg);
      io.emit('receive_locations', locations);
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