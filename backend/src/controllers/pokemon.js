const express = require("express");
const userSchema = require("../models/pokemon");

const router = express.Router();

router.get("/list/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .find({ id_user: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.post("/register", (req, res) => {
    const pokemon = userSchema(req.body);
    pokemon
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.post("/verify_favorite", (req, res) => {
    userSchema
        .find({id_user: req.body.id_user, name: req.body.name})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;