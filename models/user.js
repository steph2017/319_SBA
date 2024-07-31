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

const User = mongoose.model('User', userSchema);
export default User;
