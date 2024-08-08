import User from "../models/user";
import logs from "./logs";

const users = [
    {
        id: 1,
        username: "Chika123",
        tarCals: 1000,
        tarCarbs: 100,
        tarProtein: 80,
        tarFat: 30,
        logs: []
    },
    {
        id: 2,
        username: "Burt842",
        tarCals: 3000,
        tarCarbs: 400,
        tarProtein: 220,
        tarFat: 55,
        logs: []
    },
    {
        id: 3,
        username: "Tinie007",
        tarCals: 1300,
        tarCarbs: 30,
        tarProtein: 110,
        tarFat: 80,
        logs: []
    },
    {
        id: 4,
        username: "Ngozi333",
        tarCals: 1300,
        tarCarbs: 30,
        tarProtein: 110,
        tarFat: 80,
        logs: []
    },
    {
        id: 5,
        username: "Malika798",
        tarCals: 1300,
        tarCarbs: 30,
        tarProtein: 110,
        tarFat: 80,
        logs: []
    },
    {
        id: 6,
        username: "Tracy87",
        tarCals: 1300,
        tarCarbs: 30,
        tarProtein: 110,
        tarFat: 80,
        logs: []
    },
    {
        id: 7,
        username: "Matthew320",
        tarCals: 1300,
        tarCarbs: 30,
        tarProtein: 110,
        tarFat: 80,
        logs: []
    }
]

function findandUpdateLogs(users, logs) {
    users.forEach(user => {
        // Filter logs for the specific user_id
        const userLogs = logs.filter(log => log.user_id === user.id);
        // Extract log IDs
        const logIds = userLogs.map(log => log.id);
        // Update the user's logs field in place
        user.logs = logIds;
    });
}

findandUpdateLogs(users, logs);

export default users;