// const verifyJWT = require('../middleware/authenticate.js');
const twilio = require('twilio')
// var messagebird = require('messagebird')('ZWI6bQPJKzRONslYP7K0cbUxE');
module.exports = (app, router) => {
    const {locations, form} = require('../models')
	const userController = require('../controllers/adminControls.js');
	

	
	router.use((req,res,next) => {
		console.log("/" + req.method);
		next();
	});
//location Routes

// app.post('/createLocation',async(req,res)=>{
//     await locations.create({
//         from:req.body.from,
//         to:req.body.to,
//         distance:req.body.distance
//     })
//     res.status(200).send('location added')

// }) 
// app.get('/getLocation', (req,res)=>{
//     locations.findAll({
//         attributes: ['id', 'from','to','distance']
// }).then(location => {
// res.json(location);
// });
// })

//form Routes
// app.post('/createForm',async(req,res)=>{
//     await form.create({
//         firstName:req.body.firstName,
//         lastName:req.body.lastName,
//         phoneNumber:req.body.phoneNumber
//     })
//     res.status(200).send('form added')

// })

// app.get('/getForms', (req,res)=>{
//     form.findAll({
//         attributes: ['firstName', 'lastName','phoneNumber']
// }).then(customer => {
// res.json(customer);
// });
// })


	// Routes for Users

			//Adding Users
			app.post('/createAdmin', userController.addUsers);
			//Posting Login Info to Server
			app.post('/login', userController.login);
			// //Starting a Session if Login info is Correct
			// app.get('/login', userController.loginSession);
			// //Verifying the User if their token is the same as the token created upon sign in
			// // app.get('/verifyUser',userController.authentication);
			// //Logging out the user by ending all sessions
			// app.get('/logOut', userController.logOut)


			// // sms
			// app.post('/sms', (req,res)=>{
			// 	const client = new twilio('AC5b6a7bf6be96ccd3486de54973bf13b4', 'e2a7073c5aa85d96627a05e3635a1c7a')
			// 	if(req.body.phoneNumber){					 
			// 		client.messages.create({
			// 			to: '+252' + (req.body.phoneNumber),
			// 			from: '+13512173726',
			// 			body: `customer id:${req.body.id} mahandsanid mudane/marwo ${req.body.firstName}  isticmaalka daallo bus company, 
			// 			buska messegkan tus markaad fuusho`
			// 		})
			// 		res.send('sms sent')
					
			// 	}else{
			// 		res.send('no phone number provided')
			// 	}
				
			// })


	// Defining the major path for all the routes *Not sure
	app.use('*', (req,res) => {
		res.sendFile(path.join(__dirname, '/client/build/', 'index.html'));
	});
}