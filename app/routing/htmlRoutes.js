// Dependencies
var path = require("path");

//Exporting routes to server.js
module.exports = function(app){
	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname,"/../public/", "index.html"));
	});
};