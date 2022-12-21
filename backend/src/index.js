const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config();
const userControllers = require("./controllers/user");

const app = express()
const port = 3000

app.use(cors())

app.use(express.json());
app.use('/api', userControllers);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

mongoose
    .set('strictQuery', true)
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Pokemon_Favorites"))
    .catch((error) => console.error(error))

app.listen(port, () => {
    console.log(`El servidor se está ejecutando en http://localhost:${port}/`)
})