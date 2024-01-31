import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	name: String,
	username: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	birthday: String,
	password: String,
	interests: [String],
	picture: {
		type: String,
		default: ''
	},
	coverPhoto: {
		type: String,
		default: ''
	},
	posts: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Post'
	}]
}, { timestamps: true })

export default mongoose.model('User', userSchema)
