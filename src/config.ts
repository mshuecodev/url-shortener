import dotenv from "dotenv"
// dotenv.config({ path: "../env" })

export const PORT = process.env.PORT || 4000
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/url_shortener"
export const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`
export const SHORT_CODE_LENGTH = parseInt(process.env.SHORT_CODE_LENGTH || "7", 10)
