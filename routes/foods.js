import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import foodsdata from "../data/foods.js";
import Food from "../models/food.js";


// outline page routes
router.get("/add", (req, res) => {
    res.render("addfood",);
});

//process added data

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

//get route via search query
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

//get route via path params
router.get("/:id", async (req, res) => {
    try {
        const result = await Food.findOne({ id: Number(req.params.id) });
        result ? res.send(result) : res.status(404).send("Not found");
    } catch (error) {
        res.status(500).send("Server error");
    }
});

//pseudo delete route using GET
router.get("/:id/delete", (req, res) => {
    let result = foodsdata.find(food => food.id === Number(req.params.id));
    res.setHeader('Content-Type', 'text/plain');
    result ? res.send(`You deleted the following record: \nid: ${newFood.id} \nName: ${newFood.name} \nDescription: ${newFood.description} \nCalories: ${newFood.cals} \nCarbs (g): ${newFood.gcarbs} \nProtein (g): ${newFood.gprotein} \nFat (g): ${newFood.gfat}`) : res.status(404).send("Not found");
});

//delete route - this route is not connected to anything!
router.delete("/:id/delete", (req, res) => {
    let result = foodsdata.find(food => food.id === Number(req.body.id));
    res.setHeader('Content-Type', 'text/plain');
    result ? res.send(`You deleted the following record: \nid: ${newFood.id} \nName: ${newFood.name} \nDescription: ${newFood.description} \nCalories: ${newFood.cals} \nCarbs (g): ${newFood.gcarbs} \nProtein (g): ${newFood.gprotein} \nFat (g): ${newFood.gfat}`) : res.status(404).send("Not found");
});

// DELETE route from form
router.delete('/foods/delete', async (req, res) => {
    const foodId = req.body.foodId;

    try {
        const result = await Food.findByIdAndDelete(foodId);
        if (result) {
            res.send(`Food item with ID ${foodId} has been deleted.`);
        } else {
            res.status(404).send(`Food item with ID ${foodId} not found.`);
        }
    } catch (err) {
        res.status(500).send("Error deleting food item: " + err.message);
    }
});

//pseudo patch route using GET
router.get("/:id/edit", (req, res) => {
    let result = foodsdata.find(food => food.id === Number(req.params.id));
    if (req.query.id) {
        newFood.id = Number(req.query.id);
        if (req.query.name) {
            newFood.name = req.query.name;
            if (req.query.description) {
                newFood.description = req.query.description;
                if (req.query.cals) {
                    newFood.cals = Number(req.query.cals);
                    if (req.query.gcarbs) {
                        newFood.gcarbs = Number(req.query.gcarbs);
                        if (req.query.gprotein) {
                            newFood.gprotein = Number(req.query.gprotein);
                            if (req.query.gfat) {
                                newFood.gfat = Number(req.query.gfat);
                            }
                        }
                    }
                }
            }
        }
    }
    res.setHeader('Content-Type', 'text/plain');
    res.send(`You updated the following record: \nid: ${newFood.id} \nName: ${newFood.name} \nDescription: ${newFood.description} \nCalories: ${newFood.cals} \nCarbs (g): ${newFood.gcarbs} \nProtein (g): ${newFood.gprotein} \nFat (g): ${newFood.gfat}`);
});

//error handler
router.use((err, req, res, next) => {
    res.status(400).send(err.message);
});

export default router;