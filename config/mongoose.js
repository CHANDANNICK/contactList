//require the library
const mongoose = require("mongoose");

//connect to database
mongoose.connect("mongodb://localhost/contacts_list_db");

//acquire the connection(if it's successfull)
const db = mongoose.connection;

//error checking
db.on("error", console.error.bind(console, "error connecting to db"));

//up and running then print the message
db.once("open", function() {
  console.log("Successfully connected to the data base");
});