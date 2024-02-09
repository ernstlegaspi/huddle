import User from '../../models/user'

export const userSetField = async (userId: string, data: object) => {
	await User.findByIdAndUpdate(userId,
		{ $set: data },
		{ new: true }
	)
}

export const userPushField = async (userId: string, data: object) => {
	await User.findByIdAndUpdate(userId,
		{ $push: data },
		{ new: true }
	)
}

export const userPullField = async (userId: string, data: object) => {
	await User.findByIdAndUpdate(userId,
		{ $pull: data },
		{ new: true }
	)
}
