import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
	name: String,
	content: String,
	type: String,
	picture: String,
	ownerId: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}
}, { timestamps: true })

export default mongoose.model('Notification', notificationSchema)
