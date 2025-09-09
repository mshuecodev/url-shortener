const mongoose = require("mongoose")
const Todo = require("../models/todo.model")

exports.getTodos = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1
		const limit = parseInt(req.query.limit) || 10
		const skip = (page - 1) * limit

		const [todos, total] = await Promise.all([
			Todo.find({
				// owner: req.user._id
			})
				.sort({ dueAt: -1 })
				.skip(skip)
				.limit(limit),
			Todo.countDocuments({
				// owner: req.user._id
			})
		])

		res.json({ todos, total, page, pages: Math.ceil(total / limit), limit })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

exports.createTodo = async (req, res) => {
	try {
		const payload = {
			...req.body
			// owner: req.user._id
		}
		const todo = new Todo(payload)
		await todo.save()
		res.status(201).json(todo)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

exports.updateTodo = async (req, res) => {
	try {
		const todo = await Todo.findOneAndUpdate(
			{
				_id: req.params.id
				// owner: req.user._id
			},
			req.body,
			{ new: true }
		)
		if (!todo) return res.status(404).json({ message: "Todo not found" })
		res.json(todo)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

exports.deleteTodo = async (req, res) => {
	try {
		const todo = await Todo.findOneAndDelete({
			_id: req.params.id
			// owner: req.user._id
		})
		if (!todo) return res.status(404).json({ message: "Todo not found" })
		res.json({ message: "Todo deleted" })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
