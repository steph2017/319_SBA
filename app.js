const express = require('express');
const app = express();
const port = 3180;

// serve static files from the styles folder
app.use(express.static("./styles"));

const fs = require('fs'); //import filesystem to read template views (not sure if I will need with Pug)
const path = require('path'); // Using Path
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: true }));

//set up Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Define a route for the root URL
app.get('/', (req, res) => {
    res.render("start",);
});

// This is a single route for all the POST requests
app.get('/add', (req, res) => {
    res.render("add",);
});


//Set Up routes
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

const logRoutes = require("./routes/logs");
app.use("/logs", logRoutes);

const foodRoutes = require("./routes/foods");
app.use("/foods", foodRoutes);


//error handler
app.use((err, req, res, next) => {
    res.status(400).send("Not Found");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});