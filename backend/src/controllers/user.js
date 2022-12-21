const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

router.post("/register", (req, res) => {
    userSchema
        .find({ username: req.body.username})
        .then((data) => {
            if (data.length == 0) {
                const user = userSchema(req.body);
                user
                    .save()
                    .then((data) => res.json({ "status": 1, "data": data }))
                    .catch((error) => res.json({ message: error }));
            } else {
                res.json({ "status": 0, "data": "El usuario ya existe" })
            }
        })
        .catch((error) => res.json({ message: error }));
});

router.post("/login", (req, res) => {
    userSchema
        .find({username: req.body.username, password: req.body.password})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;