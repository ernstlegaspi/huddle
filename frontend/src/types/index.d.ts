type User = {
	id?: string
	birthday: string
	coverPhoto?: string
	email: string
	interests: string[]
	name: string
	password: string
	picture?: string
	username: string
}

type AuthUser = {
	name: string
	email: string
	username: string
	picture?: string
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
