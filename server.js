// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
// var logger = require("morgan");
var mongoose = require("mongoose");
// Requiring our Note and Article models
// var Note = require("./models/Note.js");
// var Article = require("./models/Article.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
var methodOverride = require("method-override");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Initialize Express
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));
// Use morgan and body parser with our app
// app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// // Make public a static dir
// app.use(express.static("public"));


// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// var db = require("./models/Note.js");

require("./controllers/controller.js")(app);



// Database configuration with mongoose
// mongoose.connect("mongodb://localhost/week18day3mongoose");
// var db = mongoose.connection;

// // Show any mongoose errors
// db.on("error", function(error) {
//   console.log("Mongoose Error: ", error);
// });

// // Once logged in to the db through mongoose, log a success message

// db.once("open", function() {
//   console.log("Mongoose connection successful.");
// });


// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});