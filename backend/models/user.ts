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
	hasNotification: {
		type: Boolean,
		default: false
	},
	notifications: Number,
	picture: {
		type: String,
		default: ''
	},
	coverPhoto: {
		type: String,
		default: ''
	},
	requestsSent: [String],
	friends: [{
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}],
	posts: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Post'
	}],
	likedPosts: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Post'
	}]
}, { timestamps: true })

export default mongoose.model('User', userSchema)
