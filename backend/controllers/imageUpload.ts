import mongoose from 'mongoose'
import { Request, Response } from 'express'
import { catchError, error, success } from '../utils'

export const temporaryPostImageUpload = async (req: Request, res: Response) => {
	return catchError(async () => {
		const allowedFile = ["png", "jpeg", "jpg", "webp"]
		const file = req.file

		if(!file) return error(400, res)

		const filename = file.filename

		if(!allowedFile.includes(filename.split(".")[1])) return error(400, res, "Not an image.")

		return success({ filename }, 201, res)
	}, res)
}
