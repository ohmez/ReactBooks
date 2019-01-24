const express = require("express");
const path = require("path");
const routes = require("./routes");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const app = express();


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Use Routes for url pathing to determine content population
app.use(routes);

//Connect to the database
mongoose.connect("mongodb://localhost/googlebooks",{useNewUrlParser: true}, () => console.log("db connected"));

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});