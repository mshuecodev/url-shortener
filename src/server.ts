import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import rateLimit from "express-rate-limit"
import urlRoutes from "./router/url"
import { MONGO_URI, PORT } from "./config"
import { urlModel } from "./models/url" // Ensure the model is registered
import { start } from "repl"

const app = express()
app.use(cors())
app.use(express.json())

const appLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100 // limit each IP to 100 requests per windowMs
})

app.use(appLimiter)

app.use("/api", urlRoutes)

app.use(express.static("public"))

async function startServer() {
	try {
		await mongoose.connect(MONGO_URI)
		console.log("Connected to MongoDB")
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`)
		})
	} catch (error) {
		console.error("Failed to connect to MongoDB", error)
		process.exit(1)
	}
}

startServer()
