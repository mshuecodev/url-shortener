import express from "express"
import validUrl from "valid-url"
import { urlModel } from "../models/url"
import { generateCode } from "../utils/codeGen"
import { BASE_URL } from "../config"

const router = express.Router()

router.post("/shorten", async (req, res) => {
	try {
		const { url, customAlias } = req.body
		if (!url || typeof url !== "string") {
			return res.status(400).json({ error: "Invalid URL" })
		}

		if (!validUrl.isWebUri(url)) {
			return res.status(400).json({ error: "Invalid URL format" })
		}

		let code = ""
		if (customAlias) {
			if (typeof customAlias !== "string" || !/^[a-zA-Z0-9_-]+$/.test(customAlias)) {
				return res.status(400).json({ error: "Custom alias can only contain alphanumeric characters, hyphens, and underscores" })
			}

			const existing = await urlModel.findOne({ code: customAlias }).lean()
			if (existing) {
				return res.status(409).json({ error: "Custom alias already in use" })
			}
			code = customAlias
		} else {
			let attempts = 0
			do {
				code = generateCode()
				const existing = await urlModel.findOne({ code }).lean()
				if (!existing) break
				attempts++
			} while (attempts < 5)

			if (!code) {
				return res.status(500).json({ error: "Could not generate a unique code, please try again" })
			}
		}

		const shortUrl = `${BASE_URL}/${code}`

		const doc = new urlModel({
			originalUrl: url,
			code,
			shortUrl,
			clicks: 0
		})
		await doc.save()

		return res.status(201).json({ shortUrl, code })
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: "Server error" })
	}
})

router.get("/stat/:code", async (req, res) => {
	try {
		const { code } = req.params
		const urlEntry = await urlModel.findOne({ code }).lean()
		if (!urlEntry) {
			return res.status(404).json({ error: "URL not found" })
		}

		return res.json({ originalUrl: urlEntry.originalUrl, clicks: urlEntry.clicks, shortUrl: urlEntry.shortUrl })
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: "Server error" })
	}
})

export default router
