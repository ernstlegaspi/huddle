type AuthUser = {
	name: string
	email: string
	username: string
	picture?: string
}

type TNotification = {
	content: string
	_id?: string
	name: string
  otherUserId: string
	ownerId: string
	picture: string
	type: string
}

type Post = {
	body: string
	email?: string
	id?: string
	likes?: string[]
	name: string
	pictures: string
	tags: string[]
	username: string
	userPicture: string
}

type User = {
	_id?: string
	birthday: string
	coverPhoto?: string
	email: string
	interests: string[]
	name: string
	password: string
	picture?: string
	username: string
}
