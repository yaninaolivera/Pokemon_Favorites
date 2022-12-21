const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    email_address: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);