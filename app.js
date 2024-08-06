import express from "express";
const app = express();

//set up env
import env from 'dotenv';
env.config();

const port = process.env.PORT;

//set up connection and seed data
import mongoose from "mongoose";

import seedData from "./data/seeddata.js"; //function to load data
import User from "./models/user.js";
import Log from "./models/log.js";
import Food from "./models/food.js";

await mongoose.connect(process.env.MONGOURL);
//seed data
try {
    seedData(User, Food, Log);
} catch (err) {
    console.error(err);
    res.status(500).send('Error seeding data');
}

// serve static files from the public folder (adjusted to include my api call modules)
app.use(express.static(path.join(__dirname, 'public')));


// Others - may not need
import fs from "fs"; //import filesystem to read template views (not sure if I will need with Pug)
import path from "path"; // Using Path  
import bodyparser from "body-parser";




app.use(bodyparser.urlencoded({ extended: true }));

//set up Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Define a route for the root URL
app.get('/', (req, res) => {
    //front end
    res.render("start",);

});

// This is a single route for all the POST requests
// app.get('/add', (req, res) => {
//     res.render("add",);
// });


//Set Up routes
import userRoutes from "./routes/users.js";
app.use("/users", userRoutes);

import logRoutes from "./routes/logs.js";
app.use("/logs", logRoutes);

import foodRoutes from "./routes/foods.js";
app.use("/foods", foodRoutes);


//error handler
app.use((err, req, res, next) => {
    res.status(400).send("Not Found");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});