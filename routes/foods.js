import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import foodsdata from "../data/foods.js";
import Food from "../models/food.js";


// outline page routes
router.get("/add", (req, res) => {
    res.render("addfood",);
});

router.get('/edit', (req, res) => {
    //front end
    res.render("editfoods",);

});

//process added data

//POST route
router.post("/added", async (req, res) => {
    try {
        const { food_name, food_desc, food_cals, gCarbs, gProtein, gFat } = req.body;

        const foodCount = await Food.countDocuments({});

        const newFood = new Food({
            id: foodCount + 1,
            name: food_name,
            description: food_desc,
            cals: food_cals,
            gcarbs: gCarbs,
            gprotein: gProtein,
            gfat: gFat,
        });

        await newFood.save();

        res.setHeader('Content-Type', 'text/plain');
        res.send(`You added the following record: \nid: ${newFood.id} \nName: ${newFood.name} \nDescription: ${newFood.description} \nCalories: ${newFood.cals} \nCarbs (g): ${newFood.gcarbs} \nProtein (g): ${newFood.gprotein} \nFat (g): ${newFood.gfat}`);


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating new food" });
    }
});

//GET route via search query
router.get("/", async (req, res) => {
    try {
        if (req.query.id) {
            const result = await Food.findOne({ id: Number(req.query.id) });
            if (result) res.send(result);
            else res.status(404).send("Not found");
        }
        else {
            const foods = await Food.find();
            res.send(foods);
        }
    } catch (error) {
        res.status(500).send("Server error");
    }
});

//GET route via path params
router.get("/:id", async (req, res) => {
    try {
        const result = await Food.findOne({ id: Number(req.params.id) });
        result ? res.send(result) : res.status(404).send("Not found");
    } catch (error) {
        res.status(500).send("Server error");
    }
});

//DELETE route 
router.delete("/:id/delete", async (req, res) => {
    try {
        const result = await Food.findOneAndDelete({ id: Number(req.params.id) });

        res.setHeader('Content-Type', 'text/plain');
        result ? res.send(`You deleted the following record: \nid: ${result.id} \nName: ${result.name} \nDescription: ${result.description} \nCalories: ${result.cals} \nCarbs (g): ${result.gcarbs} \nProtein (g): ${result.gprotein} \nFat (g): ${result.gfat}`) : res.status(404).send("Food not found");
    } catch (error) {
        res.status(500).send("Server error");
    }
});

//PATCH route
router.patch("/:id/edit", async (req, res) => {
    //instead of multiple db calls, complie all potential updates to an object and query that
    const updatedFields = {};

    if (req.query.name) updatedFields.name = req.query.name;
    if (req.query.description) updatedFields.description = req.query.description;
    if (req.query.cals) updatedFields.cals = Number(req.query.cals);
    if (req.query.gcarbs) updatedFields.gcarbs = Number(req.query.gcarbs);
    if (req.query.gprotein) updatedFields.gprotein = Number(req.query.gprotein);
    if (req.query.gfat) updatedFields.gfat = Number(req.query.gfat);

    try {
        const result = await Food.findOneAndUpdate(
            { id: req.params.id },
            { $set: updatedFields },
            { new: true } // return the updated document not the old one
        );
        res.setHeader('Content-Type', 'text/plain');
        result ? res.send(`You updated the following record: \nid: ${result.id} \nName: ${result.name} \nDescription: ${result.description} \nCalories: ${result.cals} \nCarbs (g): ${result.gcarbs} \nProtein (g): ${result.gprotein} \nFat (g): ${result.gfat}`) : res.status(404).send("Food not found");
    } catch (error) {
        res.status(500).send("Server error");
    }

});

//error handler
router.use((err, req, res, next) => {
    res.status(400).send(err.message);
});

export default router;