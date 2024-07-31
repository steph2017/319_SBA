import express from "express";
const router = express.Router();
import usersdata from "../data/users.js";
import bodyparser from "body-parser";

//set up body parser
router.use(bodyparser.urlencoded({ extended: true }));

// outline page routes

//process added data
router.post("/added", (req, res) => {
    const { username, dailycal, gCarbs, gProtein, gFat } = req.body;

    let result = { //technically dont need to build this to render the parsed info in the response but if we were updating a database we would need to organize the info inputted 
        id: usersdata.length + 1,
        username: username,
        tarCals: dailycal,
        tarCarbs: gCarbs,
        tarProtein: gProtein,
        tarFat: gFat,
        logs: []
    };
    res.setHeader('Content-Type', 'text/plain');
    result ? res.send(`You added the following record: \nid: ${result.id} \nusername: ${result.username} \nDaily Calorie Target: ${result.tarCals} \nTarget Carbs: ${result.tarCarbs} \nTarget Protein: ${result.tarProtein} \nTarget Fat: ${result.tarFat} \nLogs: ${result.logs} `) : res.status(404).send("Not found");
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
    result ? res.send(`You deleted the following record: \nid: ${result.id} \nusername: ${result.username} \nDaily Calorie Target: ${result.tarCals} \nTarget Carbs: ${result.tarCarbs} \nTarget Protein: ${result.tarProtein} \nTarget Fat: ${result.tarFat} \nLogs: ${result.logs} `) : res.status(404).send("Not found");
});

//delete route - this route is not connected to anything!
router.delete("/:id/delete", (req, res) => {
    let result = usersdata.find(user => user.id === Number(req.body.id));
    res.setHeader('Content-Type', 'text/plain');
    result ? res.send(`You deleted the following record: \nid: ${result.id} \nusername: ${result.username} \nDaily Calorie Target: ${result.tarCals} \nTarget Carbs: ${result.tarCarbs} \nTarget Protein: ${result.tarProtein} \nTarget Fat: ${result.tarFat} \nLogs: ${result.logs} `) : res.status(404).send("Not found");
});

//pseudo patch route using GET
router.get("/:id/edit", (req, res) => {
    let result = usersdata.find(user => user.id === Number(req.params.id));
    if (req.query.id) result.id = Number(req.query.id);
    if (req.query.username) result.username = req.query.username;
    if (req.query.tarCals) result.tarCals = Number(req.query.tarCals);
    if (req.query.tarCarbs) result.tarCarbs = Number(req.query.tarCarbs);
    if (req.query.tarProtein) result.tarProtein = Number(req.query.tarProtein);
    if (req.query.tarFat) result.tarFat = Number(req.query.tarFat);
    if (req.query.logs) result.logs = req.query.logs.map(id => Number(id));

    res.setHeader('Content-Type', 'text/plain');
    result ? res.send(`You deleted the following record: \nid: ${result.id} \nusername: ${result.username} \nDaily Calorie Target: ${result.tarCals} \nTarget Carbs: ${result.tarCarbs} \nTarget Protein: ${result.tarProtein} \nTarget Fat: ${result.tarFat} \nLogs: ${result.logs} `) : res.status(404).send("Not found");
});

//error handler
router.use((err, req, res, next) => {
    res.status(400).send("Not Found");
});

export default router;