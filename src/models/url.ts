import mongoose, { Document, Schema } from "mongoose"

export interface IUrl extends Document {
	originalUrl: string
	code: string
	shortUrl: string
	clicks: number
	createdAt: Date
}

const urlSchema: Schema = new Schema({
	originalUrl: { type: String, required: true },
	code: { type: String, required: true, unique: true },
	shortUrl: { type: String, required: true, unique: true },
	clicks: { type: Number, default: 0 },
	createdAt: { type: Date, default: Date.now }
})

export const urlModel = mongoose.model<IUrl>("Url", urlSchema)
