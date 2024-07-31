import foods from "./foods.js";
import users from "./users.js";

const logs = [
    {
        id: 1,
        user_id: 1,
        date: "20230815",
        food_ids: [1, 4],
        tCals: 0,
        tgCarbs: 0,
        tgProtein: 0,
        tgFat: 0,
        metcalTarget: false,
        calsLeft: 0
    },
    {
        id: 2,
        user_id: 1,
        date: "20230816",
        food_ids: [1, 1, 1, 4, 4, 4],
        tCals: 0,
        tgCarbs: 0,
        tgProtein: 0,
        tgFat: 0,
        metcalTarget: false,
        calsLeft: 0
    }, {
        id: 3,
        user_id: 2,
        date: "20230815",
        food_ids: [2, 3, 4],
        tCals: 0,
        tgCarbs: 0,
        tgProtein: 0,
        tgFat: 0,
        metcalTarget: false,
        calsLeft: 0
    }, {
        id: 4,
        user_id: 3,
        date: "20230815",
        food_ids: [1, 2, 5],
        tCals: 0,
        tgCarbs: 0,
        tgProtein: 0,
        tgFat: 0,
        metcalTarget: false,
        calsLeft: 0
    }, {
        id: 5,
        user_id: 2,
        date: "20230908",
        food_ids: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        tCals: 0,
        tgCarbs: 0,
        tgProtein: 0,
        tgFat: 0,
        metcalTarget: false,
        calsLeft: 0
    }, {
        id: 6,
        user_id: 2,
        date: "20230909",
        food_ids: [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1],
        tCals: 0,
        tgCarbs: 0,
        tgProtein: 0,
        tgFat: 0,
        metcalTarget: false,
        calsLeft: 0
    }, {
        id: 7,
        user_id: 3,
        date: "20240222",
        food_ids: [1, 2, 1, 2, 3, 4],
        tCals: 0,
        tgCarbs: 0,
        tgProtein: 0,
        tgFat: 0,
        metcalTarget: false,
        calsLeft: 0
    }, {
        id: 8,
        user_id: 1,
        date: "20231101",
        food_ids: [4, 4, 4, 4, 5, 5, 5, 5],
        tCals: 0,
        tgCarbs: 0,
        tgProtein: 0,
        tgFat: 0,
        metcalTarget: false,
        calsLeft: 0
    }, {
        id: 9,
        user_id: 3,
        date: "20240507",
        food_ids: [2, 2, 3, 5],
        tCals: 0,
        tgCarbs: 0,
        tgProtein: 0,
        tgFat: 0,
        metcalTarget: false,
        calsLeft: 0
    }, {
        id: 10,
        user_id: 3,
        date: "20240613",
        food_ids: [1, 2, 3, 4, 5],
        tCals: 0,
        tgCarbs: 0,
        tgProtein: 0,
        tgFat: 0,
        metcalTarget: false,
        calsLeft: 0
    }
]

//due to error running code i need to initialize object first *then* populate variables based on the newly initialized variables.
function calculateMacros(logs) {
    logs.forEach(log => {
        const foodItems = log.food_ids.map(id => foods.find(food => food.id === id)); //takes food_ids , converts to the calories of the referenced food
        const user = users.find(user => user.id === log.user_id);

        const tCals = foodItems.reduce((acc, food) => acc + food.cals, 0);
        const tgCarbs = foodItems.reduce((acc, food) => acc + food.gcarbs, 0);
        const tgProtein = foodItems.reduce((acc, food) => acc + food.gprotein, 0);
        const tgFat = foodItems.reduce((acc, food) => acc + food.gfat, 0);
        const metcalTarget = user.tarCals > tCals ? false : true;
        const calsLeft = user.tarCals - tCals;

        log.tCals = tCals;
        log.tgCarbs = tgCarbs;
        log.tgProtein = tgProtein;
        log.tgFat = tgFat;
        log.metcalTarget = metcalTarget;
        log.calsLeft = calsLeft;
    });
}

calculateMacros(logs);

export default logs;