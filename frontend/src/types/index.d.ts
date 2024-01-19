type User = {
	id?: string
	name: string
	email: string
	username: string
	interests: string[]
	birthday: string
	password: string
	picture?: string
}

type AuthUser = {
	name: string
	email: string
	username: string
	picture?: string
}

type Post = {
	id?: string
	body: string
	likes?: string[]
	name: string
	pictures: string
	tags: string[]
	username: string
	userPicture: string
}
