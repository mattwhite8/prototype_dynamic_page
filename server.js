/* eslint-disable no-alert, no-console */
/*eslint-env node*/

// Dependencies
var express = require("express");

var app = express();

//Use Heroku port or local 3000
var PORT = process.env.PORT || 3000;

//Pulling in routes defined under routing folder
require("./app/routing/htmlRoutes.js")(app);

//Static middleware will serve our css file
app.use(express.static("app"));

app.listen(PORT, function(){
	console.log("App listening on port:", PORT);
});