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

	// Routes for Locations

			// creating Locations
			app.post('/createLocation', LocationController.createLocations)

}