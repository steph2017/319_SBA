import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    tarCals: {
        type: Number,
        required: true
    },
    tarCarbs: {
        type: Number,
        required: true
    },
    tarProtein: {
        type: Number,
        required: true
    },
    tarFat: {
        type: Number,
        required: true
    },
    logs: {
        type: [Number],
        default: []
    }
});

userSchema.methods.findLogs = async function () {
    try {
        const logs = await Log.find({
            user_id: this.id,
            ...criteria
        });
        const logIds = logs.map(log => log.id);
        this.logs = logIds;
        await this.save();
        return logIds;
    } catch (error) {
        console.error("Error finding logs:", error);
        throw error;
    }
};

userSchema.methods.findLogs = async function (logs) {
    try {
        const userLogs = logs.filter(log => log.user_id === this.id);
        const logIds = userLogs.map(log => log.id);
        this.logs = logIds;
        await this.save();
        return logIds;
    } catch (error) {
        console.error("Error finding logs:", error);
        throw error;
    }
};

const User = mongoose.model('User', userSchema);
export default User;
