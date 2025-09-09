const app = require("./app")
const mongoose = require("mongoose")

const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/todoapp"

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB")
	})
	.catch((err) => {
		console.error("Failed to connect to MongoDB", err)
		process.exit(1)
	})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
