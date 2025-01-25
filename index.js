const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

//connect to mongodb

mongoose.connect(process.env.MONGO_URI, {
    userNewUrlParser: true,
    userUnifiedTopology: true
}).then(() => console.log("connected to mongodb"))
.catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console,log(`Server is running on port ${PORT}`)); 