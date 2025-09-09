const mongoose = require("mongoose")

const ToodoSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String
		},
		completed: {
			type: Boolean,
			default: false
		},
		dueAt: {
			type: Date,
			index: true
		}
		// owner: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: "User",
		// 	required: true
		// }
	},
	{
		timestamps: true,
		useOptimistic: true
	}
)

ToodoSchema.index({ owner: 1, dueAt: -1 })

module.exports = mongoose.model("Todo", ToodoSchema)
