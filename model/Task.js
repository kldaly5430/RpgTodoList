const { date, string } = require('@hapi/joi');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    complete: {
        type: Boolean,
        required: true
    },
    goal: {
        type: Date,
        required: false
    },
    rewardType: {
        type: String,
        required: true
    },
    rewardItem: {
        type: String,
        required: false
    },
    rewardExp: {
        type: Number,
        required: false
    }

});

module.exports = mongoose.Schema('Task', taskSchema);