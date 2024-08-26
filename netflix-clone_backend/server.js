const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb://127.0.0.1:27017/netflix";

mongoose
    .connect(uri)
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });

app.use("/api/user", userRoutes);
app.listen(5004, console.log("Server Started"));