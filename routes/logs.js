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

        const logCount = await Log.countDocuments({});

        const newLog = new Log({
            id: logsdata.length + 1,
            user_id: userid,
            date: logdate,
            food_ids: foodids

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
        res.status(500).json({ error: "Error creating new food" });
    }
    let result = {
        id: logsdata.length + 1,
        user_id: userid,
        date: logdate,
        food_ids: foodids,
        tCals: "calculations applied",
        tgCarbs: "calculations applied",
        tgProtein: "calculations applied",
        tgFat: "calculations applied",
        metcalTarget: "calculations applied",
        calsLeft: "calculations applied"
    };
    res.setHeader('Content-Type', 'text/plain');
    result ? res.send(`You added the following record: \nid: ${newLog.id} \nUser id: ${newLog.user_id} \nLog Date: ${newLog.date} \nFood ids: ${newLog.food_ids} \nCalories Logged: ${newLog.tCals} \nCarbs (g): ${newLog.tgCarbs} \nProtein (g): ${newLog.tgProtein} \nFat (g): ${newLog.tgFat} \nMet Calorie Target?: ${newLog.metcalTarget} \nCalories Remaining: ${newLog.calsLeft}`) : res.status(404).send("Not found");
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


//pseudo delete route using GET
router.get("/:id/delete", (req, res) => {
    let result = logsdata.find(log => log.id === Number(req.params.id));
    res.setHeader('Content-Type', 'text/plain');
    result ? res.send(`You deleted the following record: \nid: ${newLog.id} \nUser id: ${newLog.user_id} \nLog Date: ${newLog.date} \nFood ids: ${newLog.food_ids} \nCalories Logged: ${newLog.tCals} \nCarbs (g): ${newLog.tgCarbs} \nProtein (g): ${newLog.tgProtein} \nFat (g): ${newLog.tgFat} \nMet Calorie Target?: ${newLog.metcalTarget} \nCalories Remaining: ${newLog.calsLeft}`) : res.status(404).send("Not found");
});

//delete route - this route is not connected to anything!
router.delete("/:id/delete", (req, res) => {
    let result = logsdata.find(log => log.id === Number(req.body.id));
    res.setHeader('Content-Type', 'text/plain');
    result ? res.send(`You deleted the following record: \nid: ${newLog.id} \nUser id: ${newLog.user_id} \nLog Date: ${newLog.date} \nFood ids: ${newLog.food_ids} \nCalories Logged: ${newLog.tCals} \nCarbs (g): ${newLog.tgCarbs} \nProtein (g): ${newLog.tgProtein} \nFat (g): ${newLog.tgFat} \nMet Calorie Target?: ${newLog.metcalTarget} \nCalories Remaining: ${newLog.calsLeft}`) : res.status(404).send("Not found");
});

//pseudo patch route using GET
router.get("/:id/edit", (req, res) => {
    let result = logsdata.find(log => log.id === Number(req.params.id));
    if (req.query.id) newLog.id = Number(req.query.id);
    if (req.query.user_id) newLog.user_id = Number(req.query.user_id);
    if (req.query.date) newLog.date = req.query.date;
    if (req.query.food_ids) newLog.food_ids = req.query.food_ids.map(id => Number(id));
    if (req.query.tCals) newLog.tCals = Number(req.query.tCals);
    if (req.query.tgCarbs) newLog.tgCarbs = Number(req.query.tgCarbs);
    if (req.query.tgProtein) newLog.tgProtein = Number(req.query.tgProtein);
    if (req.query.tgFat) newLog.tgFat = Number(req.query.tgFat);
    req.query.metcalTarget === "true" ? newLog.metcalTarget = true : newLog.metcalTarget = false;
    if (req.query.calsLeft) newLog.calsLeft = Number(req.query.calsLeft);

    res.setHeader('Content-Type', 'text/plain');
    result ? res.send(`You updated the following record: \nid: ${newLog.id} \nUser id: ${newLog.user_id} \nLog Date: ${newLog.date} \nFood ids: ${newLog.food_ids} \nCalories Logged: ${newLog.tCals} \nCarbs (g): ${newLog.tgCarbs} \nProtein (g): ${newLog.tgProtein} \nFat (g): ${newLog.tgFat} \nMet Calorie Target?: ${newLog.metcalTarget} \nCalories Remaining: ${newLog.calsLeft}`) : res.status(404).send("Not found");
});

//error handler
router.use((err, req, res, next) => {
    res.status(400).send(err.message);
});

export default router;