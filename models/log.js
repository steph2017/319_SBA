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

logSchema.methods.calcMacros = async function (foods, users) {
    const foodItems = this.food_ids.map(id => foods.find(food => food.id === id));
    const user = users.find(user => user.id === this.user_id);

    this.tCals = foodItems.reduce((acc, food) => acc + food.cals, 0);
    this.tgCarbs = foodItems.reduce((acc, food) => acc + food.gcarbs, 0);
    this.tgProtein = foodItems.reduce((acc, food) => acc + food.gprotein, 0);
    this.tgFat = foodItems.reduce((acc, food) => acc + food.gfat, 0);
    this.metcalTarget = user.tarCals > this.tCals ? false : true;
    this.calsLeft = user.tarCals - this.tCals;

    await this.save();
};

const Log = mongoose.model('Log', logSchema);
export default Log;
