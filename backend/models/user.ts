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
	interests: [String]
})

export default mongoose.model('User', userSchema)
