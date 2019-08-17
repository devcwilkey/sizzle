// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Reservations Data (DATA)
// =============================================================
var tables = [];
var waitlist = [];
var maxTables = 5;
var maxWaitList = 5;

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all characters
app.get("/reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

// Displays a single character, or returns false
app.get("/api/characters/:character", function(req, res) {
  var chosen = req.params.character;

  console.log(chosen);

  for (var i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/reservation", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  
  var reservation = req.body;
  console.log(tables.length);
  if(tables.length === maxTables && waitlist.length === maxWaitList){
    console.log("Sorry Restaurant is Busy as Fuck and our Table \ WaitList is full");
  } else {
    if(tables.length < maxTables){
      console.log("Adding Reservation to Tables");
      tables.push(reservation);
    } else {
      console.log("We are out of Table Reservations; Checking the WaitList...")
      if(waitlist.length < maxWaitList){
        console.log("Adding Reservation to Wait List");
        waitlist.push(reservation);
      }
    }
  }
  if(tables.length > 0){
    console.log("Table Reservations: ");
    console.log(tables);
  }
  if(waitlist.length > 0){
    console.log("Waitlist Reservations: ");
    console.log(waitlist);
  }
  

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  // newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

  // console.log(newCharacter);

  // characters.push(newCharacter);

  // res.json(newCharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
