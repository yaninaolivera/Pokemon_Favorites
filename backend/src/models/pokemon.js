const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    id_user: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Pokemon", userSchema);