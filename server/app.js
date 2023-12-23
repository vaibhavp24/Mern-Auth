const express = require('express')
const mongoose = require('mongoose')
const router = require("./routes/user-routes")
const cookieParser = require("cookie-parser")
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(cookieParser())
app.use(express.json())
app.use("/api", router)
const PORT = process.env.PORT || 5000

mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.ju77r04.mongodb.net/auth?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(PORT)
        console.log(`Database is connected! Listening to localhost ${PORT}`);
    }).catch((err) => {
        console.log(err);
    })
// NSL463AE5t6yWq7Z