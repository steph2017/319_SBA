import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import Log from "../models/log.js";
import Food from "../models/food.js";
import User from "../models/user.js";
import logsdata from "../data/logs.js";

// outline page routes
router.get("/add", (req, res) => {
    res.render("addlog",);
});

router.get('/edit', (req, res) => {
    res.render("editlogs",);
});

//process added data
router.post("/added", async (req, res) => {
    try {
        const { userid, logdate, foodids } = req.body;
        const newFoodids = foodids.split(',');
        const numFoodids = newFoodids.map(id => Number(id));

        const logCount = await Log.countDocuments({});

        const newLog = new Log({
            id: logCount + 1,
            user_id: Number(userid),
            date: logdate,
            food_ids: numFoodids

        });

        // get all food and user info from db
        const foods = await Food.find({});
        const users = await User.find({});

        //Call the calculation method i made to populate the rest of the boecjt properties (tCals, etc.)
        await newLog.calcMacros(foods, users);

        await newLog.save();

        res.setHeader('Content-Type', 'text/plain');
        res.send(`You added the following record: \nid: ${newLog.id} \nUser id: ${newLog.user_id} \nLog Date: ${newLog.date} \nFood ids: ${newLog.food_ids} \nCalories Logged: ${newLog.tCals} \nCarbs (g): ${newLog.tgCarbs} \nProtein (g): ${newLog.tgProtein} \nFat (g): ${newLog.tgFat} \nMet Calorie Target?: ${newLog.metcalTarget} \nCalories Remaining: ${newLog.calsLeft}`);


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating new log" });
    }
});

//get route via search query
router.get("/", async (req, res) => {
    try {
        if (req.query.id) {
            const result = await Log.findOne({ id: Number(req.query.id) });
            if (result) res.send(result);
            else res.status(404).send("Not found");
        }
        else {
            const logs = await Log.find();
            res.send(logs);
        }
    } catch (error) {
        res.status(500).send("Server error");
    }
});

//get route via path params
router.get("/:id", async (req, res) => {
    try {
        const result = await Log.findOne({ id: Number(req.params.id) });
        result ? res.send(result) : res.status(404).send("Not found");
    } catch (error) {
        res.status(500).send("Server error");
    }
});


//DELETE route 
router.delete("/:id/delete", async (req, res) => {
    try {
        const result = await Log.findOneAndDelete({ id: Number(req.params.id) });

        res.setHeader('Content-Type', 'text/plain');
        result ? res.send(`You deleted the following record: \nid: ${result.id} \nUser id: ${result.user_id} \nLog Date: ${result.date} \nFood ids: ${result.food_ids} \nCalories Logged: ${result.tCals} \nCarbs (g): ${result.tgCarbs} \nProtein (g): ${result.tgProtein} \nFat (g): ${result.tgFat} \nMet Calorie Target?: ${result.metcalTarget} \nCalories Remaining: ${result.calsLeft}`) : res.status(404).send("Food not found");
    } catch (error) {
        res.status(500).send("Server error");
    }
});


//PATCH route
router.patch("/:id/edit", async (req, res) => {
    //instead of multiple db calls, complie all potential updates to an object and query that
    const updatedFields = {};

    if (req.query.user_id) updatedFields.user_id = Number(req.query.user_id);
    if (req.query.date) updatedFields.date = req.query.date;
    if (req.query.food_ids) updatedFields.food_ids = req.query.food_ids.map(id => Number(id));
    console.log(updatedFields.food_ids);

    try {
        const result = await Log.findOneAndUpdate(
            { id: req.params.id },
            { $set: updatedFields },
            { new: true } // return the updated document not the old one
        );

        //filling in the rest of the fields - get all food and user info from db
        const foods = await Food.find({});
        const users = await User.find({});

        //Call the calculation method i made 
        await result.calcMacros(foods, users);

        res.setHeader('Content-Type', 'text/plain');
        result ? res.send(`You updated the following record: \nid: ${result.id} \nUser id: ${result.user_id} \nLog Date: ${result.date} \nFood ids: ${result.food_ids} \nCalories Logged: ${result.tCals} \nCarbs (g): ${result.tgCarbs} \nProtein (g): ${result.tgProtein} \nFat (g): ${result.tgFat} \nMet Calorie Target?: ${result.metcalTarget} \nCalories Remaining: ${result.calsLeft}`) : res.status(404).send("Log not found");
    } catch (error) {
        res.status(500).send("Server error");
    }

});

//error handler
router.use((err, req, res, next) => {
    res.status(400).send(err.message);
});

export default router;