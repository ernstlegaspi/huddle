import Post from '../../models/post'

export const postSetField = async (ownerId: string, data: object) => {
	await Post.updateMany({ owner: ownerId },
		{ $set: data }
	)
}
