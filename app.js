const helmet = require('helmet');                      			// set headers for better security
const express = require("express");                    			// express server module
const compression = require('compression');            			// compressed assets
const cors = require('cors');                          			// cors for react integration
const path = require("path");                          			// path to get absolute path
// models
const database = require("./src/models/database/init");			// model - database methods
// env
require('dotenv').config();                            			// environment variables
const PORT = process.env.PORT;


/////////////////////////
//         app         //
/////////////////////////

const app = express();


/////////////////////////
//     body parser     //
/////////////////////////

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/////////////////////////
//   security headers  //
/////////////////////////

app.use(helmet());

/////////////////////////
//     compression     //
/////////////////////////

app.use(compression());


/////////////////////////
//        CORS         //
/////////////////////////

app.use(cors());


/////////////////////////
//     start server    //
/////////////////////////

//
// database
//
database.initTablesViewsAndFunctions()
	//
	// server start
	//
	.then(result => {
		//
		// api routes
		//
		// auth
		app.use("/api/auth", require('./src/controllers/users/auth'));                                    // route - authentication
		// user
		app.use("/api/user", require('./src/controllers/users/user'));                                     // route - user data
		
		
		app.use('/', express.static(path.join(__dirname, '../web/build')));
		app.use('/', (req, res) => {
			res.sendFile(path.join(__dirname, '../web/build', 'index.html'));
		});

		//
		// register http listener
		//
		app.listen(PORT, () => {
			console.log(`Main server is running at: http://localhost:${PORT}`)
		});
	})

	//
	// error
	//
	.catch(err => {
		console.log("ERROR at --> app.js : npav sales : main server start \n" + err.stack);
	});