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

router.get("/profile/:id", (req, res) => {
    const {id} = req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.put("/update/:id", (req, res) => {
    const {id} = req.params;
    const {full_name, email_address, username, password} = req.body;
    userSchema
        .updateOne({_id: id}, {$set: {full_name, email_address, username, password}})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.delete("/delete/:id", (req, res) => {
    const {id} = req.params;
    userSchema
        .remove({_id: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;