const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const todoRoutes = require("./routes/todo.routes")

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100 // limit each IP to 100 requests per windowMs
})
app.use(limiter)

app.use("/api/todos", todoRoutes)

app.get("/", (req, res) => {
	res.send("Welcome to the Todo API")
})

app.get("/health", (req, res) => {
	res.status(200).send("OK")
})

module.exports = app
