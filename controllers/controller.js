var mongoose = require("mongoose");
// Requiring our Note and Article models
// var Note = require("./models/Note.js");
// var Article = require("./models/Article.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
// Requiring our models
// var db = require("../models");
var express = require("express");


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

app.get("/", function(req, res){
  res.render("index");
});



// A GET request to scrape the echojs website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  request("https://www.nytimes.com/section/technology?WT.nav=page&action=click&contentCollection=Tech&module=HPMiniNav&pgtype=Homepage&region=TopBar", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);
    // Now, we grab every h2 within an article tag, and do the following:
    $(".story").each(function(i, element) {

      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      // result.photo = $(this).children("figure").children("a").attr("href");
      result.title = $(this).children(".story-body").children(".headline").text();
      result.link = $(this).children(".story-body").children(".headline").children("a").attr("href");
      result.summary = $(this).children(".story-body").children(".summary").text();
      result.author = $(this).children(".story-body").children(".byline").children(".author").text();
      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      // var entry = new Article(result);

      // // Now, save that entry to the db
      // entry.save(function(err, doc) {
      //   // Log any errors
      //   if (err) {
      //     console.log(err);
      //   }
      //   // Or log the doc
      //   else {
      //     console.log(doc);
      //   }
      // });
      console.log(result);

    });
  });
  // Tell the browser that we finished scraping the text
  res.send("Scrape Complete");
});

// This will get the articles we scraped from the mongoDB
// app.get("/articles", function(req, res) {
//   // Grab every doc in the Articles array
//   Article.find({}, function(error, doc) {
//     // Log any errors
//     if (error) {
//       console.log(error);
//     }
//     // Or send the doc to the browser as a json object
//     else {
//       res.json(doc);
//     }
//   });
// });

// // Grab an article by it's ObjectId
// app.get("/articles/:id", function(req, res) {
//   // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//   Article.findOne({ "_id": req.params.id })
//   // ..and populate all of the notes associated with it
//   .populate("note")
//   // now, execute our query
//   .exec(function(error, doc) {
//     // Log any errors
//     if (error) {
//       console.log(error);
//     }
//     // Otherwise, send the doc to the browser as a json object
//     else {
//       res.json(doc);
//     }
//   });
// });


// // Create a new note or replace an existing note
// app.post("/articles/:id", function(req, res) {
//   // Create a new note and pass the req.body to the entry
//   var newNote = new Note(req.body);

//   // And save the new note the db
//   newNote.save(function(error, doc) {
//     // Log any errors
//     if (error) {
//       console.log(error);
//     }
//     // Otherwise
//     else {
//       // Use the article id to find and update it's note
//       Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
//       // Execute the above query
//       .exec(function(err, doc) {
//         // Log any errors
//         if (err) {
//           console.log(err);
//         }
//         else {
//           // Or send the document to the browser
//           res.send(doc);
//         }
//       });
//     }
//   });
// });
