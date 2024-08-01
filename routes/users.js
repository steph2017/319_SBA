import express from "express";
const router = express.Router();
import User from "../models/user.js";
import usersdata from "../data/users.js";
import bodyparser from "body-parser";

//set up body parser
router.use(bodyparser.urlencoded({ extended: true }));

// outline page routes

//process added data
router.post("/added", async (req, res) => {
    try {
        const { username, dailycal, gCarbs, gProtein, gFat } = req.body;

        //getting a count of total users in the db to start in order to then assign a user id:
        const userCount = await User.countDocuments({});

        // Creating documents follows a syntax similar to classes.
        const newUser = new User({
            id: userCount + 1,
            username: username,
            tarCals: dailycal,
            tarCarbs: gCarbs,
            tarProtein: gProtein,
            tarFat: gFat,
        });

        await newUser.save();

        res.setHeader('Content-Type', 'text/plain');
        res.send(`You added the following record: \nid: ${newUser.id} \nusername: ${newUser.username} \nDaily Calorie Target: ${newUser.tarCals} \nTarget Carbs: ${newUser.tarCarbs} \nTarget Protein: ${newUser.tarProtein} \nTarget Fat: ${newUser.tarFat} \nLogs: ${newUser.logs} `);


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating new user" });
    }
});

//get route via search query
router.get("/", (req, res) => {
    if (req.query.user) {
        let result = usersdata.find(user => user.id === Number(req.query.user));
        if (result) res.send(result);
        else res.status(404).send("Not found");
    }
    else {
        res.send(usersdata);
    }
});

//get route via path params
router.get("/:id", (req, res) => {
    let result = usersdata.find(user => user.id === Number(req.params.id));
    result ? res.send(result) : res.status(404).send("Not found");
});

//pseudo delete route using GET
router.get("/:id/delete", (req, res) => {
    let result = usersdata.find(user => user.id === Number(req.params.id));
    res.setHeader('Content-Type', 'text/plain');
    result ? res.send(`You deleted the following record: \nid: ${newUser.id} \nusername: ${newUser.username} \nDaily Calorie Target: ${newUser.tarCals} \nTarget Carbs: ${newUser.tarCarbs} \nTarget Protein: ${newUser.tarProtein} \nTarget Fat: ${newUser.tarFat} \nLogs: ${newUser.logs} `) : res.status(404).send("Not found");
});

//delete route - this route is not connected to anything!
router.delete("/:id/delete", (req, res) => {
    let result = usersdata.find(user => user.id === Number(req.body.id));
    res.setHeader('Content-Type', 'text/plain');
    result ? res.send(`You deleted the following record: \nid: ${newUser.id} \nusername: ${newUser.username} \nDaily Calorie Target: ${newUser.tarCals} \nTarget Carbs: ${newUser.tarCarbs} \nTarget Protein: ${newUser.tarProtein} \nTarget Fat: ${newUser.tarFat} \nLogs: ${newUser.logs} `) : res.status(404).send("Not found");
});

//pseudo patch route using GET
router.get("/:id/edit", (req, res) => {
    let result = usersdata.find(user => user.id === Number(req.params.id));
    if (req.query.id) newUser.id = Number(req.query.id);
    if (req.query.username) newUser.username = req.query.username;
    if (req.query.tarCals) newUser.tarCals = Number(req.query.tarCals);
    if (req.query.tarCarbs) newUser.tarCarbs = Number(req.query.tarCarbs);
    if (req.query.tarProtein) newUser.tarProtein = Number(req.query.tarProtein);
    if (req.query.tarFat) newUser.tarFat = Number(req.query.tarFat);
    if (req.query.logs) newUser.logs = req.query.logs.map(id => Number(id));

    res.setHeader('Content-Type', 'text/plain');
    result ? res.send(`You deleted the following record: \nid: ${newUser.id} \nusername: ${newUser.username} \nDaily Calorie Target: ${newUser.tarCals} \nTarget Carbs: ${newUser.tarCarbs} \nTarget Protein: ${newUser.tarProtein} \nTarget Fat: ${newUser.tarFat} \nLogs: ${newUser.logs} `) : res.status(404).send("Not found");
});

//error handler
router.use((err, req, res, next) => {
    res.status(400).send("Not Found");
});

export default router;