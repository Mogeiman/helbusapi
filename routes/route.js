module.exports = (app, router) => {
	const userController = require('../controllers/adminControls.js');
	const LocationController = require('../controllers/locationControls.js');
	router.use((req,res,next) => {
		next();
	});


	// Routes for Users

			//Adding Users
			app.post('/createAdmin', userController.addUsers);
			//Posting Login Info to Server
			app.post('/login', userController.login);
			// verifying if logged in
			app.get('/login', userController.loginSession);

			// logout
			app.get('/logout', userController.logOut)

	// Routes for Locations

			// creating Locations
			app.post('/createLocation', LocationController.createLocations)
			app.get('/getLocations', LocationController.getLocations)

			// update Locations
			// app.post('/updateLocation', LocationController.updateLocation)
}