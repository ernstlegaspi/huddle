import joi from 'joi'

export const signInSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().min(3).required()
})

export const signUpSchema = joi.object({
	name: joi.string().min(3).required(),
	birthday: joi.string().required(),
	username: joi.string().min(3).required(),
	email: joi.string().email().required(),
	password: joi.string().min(3).required(),
	interests: joi.array().required()
})
