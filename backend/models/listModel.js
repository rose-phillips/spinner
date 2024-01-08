const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    option: {
        type: String,
        required: true
    },
    include: {
        type: Boolean,
        required: false
    },
    style: {
        type: Object,
        required: false
    }
}, {timestamps: true});

module.exports = mongoose.model('List', listSchema)

