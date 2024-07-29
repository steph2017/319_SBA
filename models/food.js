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
    // Add timestamps 
    timestamps: true
});

// Create the model
const Food = mongoose.model('Food', foodSchema);

// Export the model
export default Food;
