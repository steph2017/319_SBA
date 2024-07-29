import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    user_id: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    food_ids: {
        type: [Number],
        required: true
    },
    tCals: {
        type: Number,
        default: 0
    },
    tgCarbs: {
        type: Number,
        default: 0
    },
    tgProtein: {
        type: Number,
        default: 0
    },
    tgFat: {
        type: Number,
        default: 0
    },
    metcalTarget: {
        type: Boolean,
        default: false
    },
    calsLeft: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Log = mongoose.model('Log', logSchema);
export default Log;
