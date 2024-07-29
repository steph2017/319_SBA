import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cals: {
        type: Number,
        required: true
    },
    gcarbs: {
        type: Number,
        required: true
    },
    gprotein: {
        type: Number,
        required: true
    },
    gfat: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Food = mongoose.model('Food', foodSchema);
export default Food;
