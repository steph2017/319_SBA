import mongoose from "mongoose";
import usersdata from "../data/users.js";
import logsdata from "../data/logs.js";
import foodsdata from "../data/foods.js";


export default async function seedData(User, Food, Log) {
    const userCount = await User.countDocuments({});
    const foodCount = await Food.countDocuments({});
    const logCount = await Log.countDocuments({});

    if (userCount < 5) {
        // get usernames
        const existingUsers = await User.find({}, { username: 1 });
        const existingUsernames = existingUsers.map(user => user.username);

        // Filter existing users by username
        const newUsers = usersdata.filter(user => !existingUsernames.includes(user.username));

        if (newUsers.length > 0) {
            await User.insertMany(newUsers);
            console.log('Sample data seeded successfully');
        } else {
            console.log('No new users to add, all usernames already exist');
        }
    } else {
        console.log('Database already has enough users, skipping seed');
    }

    if (foodCount < 5) {
        // get foods
        const existingFoods = await Food.find({}, { name: 1 });
        const existingNames = existingFoods.map(food => food.name);

        // Filter existing users by username
        const newFoods = foodsdata.filter(food => !existingNames.includes(food.name));

        if (newFoods.length > 0) {
            await Food.insertMany(newFoods);
            console.log('Sample data seeded successfully');
        } else {
            console.log('No new users to add, all usernames already exist');
        }
    } else {
        console.log('Database already has enough users, skipping seed');
    }

    if (logCount < 5) {
        // get log
        const existingLogs = await Log.find({}, { id: 1 });
        const existingIds = existingIds.map(log => log.id);

        // Filter existing users by username
        const newLogs = logsdata.filter(log => !existingIds.includes(log.id));

        if (newLogs.length > 0) {
            await Log.insertMany(newLogs);
            console.log('Sample data seeded successfully');
        } else {
            console.log('No new users to add, all usernames already exist');
        }
    } else {
        console.log('Database already has enough users, skipping seed');
    }

}