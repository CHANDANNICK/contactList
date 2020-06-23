const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.static("assets"));

// //Middleware 1
// app.use(function(req, res, next) {
//   //middleware can be used to manipulate data
//   req.myName = "Nick";
//   console.log("Middleware 1 called");
//   next();
// });

// //Middleware 2
// app.use(function(req, res, next) {
//   //testing data manipulation done by middleware 1
//   console.log("myName from middleware 2", req.myName);

//   console.log("Middleware 2 called");
//   next();
// });

// var contactList = [
//   {
//     name: "Chandan Nick",
//     phone: "8319469688"
//   },
//   {
//     name: "Nick Florance",
//     phone: "9122604804"
//   },
//   {
//     name: "Tony Stak",
//     phone: "1234567890"
//   }
// ];

//fetching data from database
app.get("/", function(req, res) {
  Contact.find({}, function(err, contacts) {
    if (err) {
      console.log("Error in finding contact");
      return;
    }
    return res.render("home", {
      title: "Contact List App",
      contact_list: contacts
    });
  });
});

// //practicing on ejs
// app.get("/practice", function(req, res) {
//   return res.render("practice", {
//     title: "Let's play with ejs"
//   });
// });

//creating contact
app.post("/create-contact", function(req, res) {
  // contactList.push(req.body);

  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone
    },
    function(err, newContact) {
      if (err) {
        console.log("Error in creating Contact");
        retun;
      }
      console.log("******", newContact);
      return res.redirect("back");
    }
  );
});

//for deleting a contact
app.get("/delete-contact/", function(req, res) {
  //get the id from query in the url
  let id = req.query.id;
  Contact.findByIdAndDelete(id, function(err) {
    if (err) {
      console.log("error in deleting the contact");
      return;
    }
  return res.redirect("back");

  });
  // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
  // if (contactIndex != -1) {
  //   contactList.splice(contactIndex, 1);
  // }
});

app.listen(port, function(err) {
  if (err) {
    console.log("Error in running the server", err);
  }
  console.log("Yup,My server is running on port:", port);
});
