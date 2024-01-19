import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
	body: String,
	likes: [String],
	name: String,
	pictures: String,
	tags: [String],
	username: String,
	userPicture: String,
	owner: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}
}, { timestamps: true })

export default mongoose.model('Post', postSchema)
