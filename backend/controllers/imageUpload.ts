import fs from 'fs'
import path from 'path'
import { Request, Response } from 'express'
import { catchError, error, success } from '../utils'

const allowedFile = ["png", "jpeg", "jpg", "webp"]
const MAX_FILE_SIZE = 1048576 // 1 MB

export const temporaryPostImageUpload = async (req: Request, res: Response) => {
	return catchError(async () => {
		const file = req.file

		if(!file) return error(400, res)

		if(file.size > MAX_FILE_SIZE) return error(400, res, "Maximum file size is 1 MB")

		const filename = file.filename

		if(!allowedFile.includes(filename.split(".")[1])) return error(400, res, "Not an image.")
	
		return success({ filename }, 201, res)
	}, res)
}

export const changePostImageUpload = async (req: Request, res: Response) => {
	try {
		const { prevImage } = req.params
		const file = req.file

		if(!file) return error(400, res)

		if(file.size > MAX_FILE_SIZE) return error(400, res, "Maximum file size is 1 MB")
	
		const filename = file.filename

		if(!allowedFile.includes(filename.split(".")[1])) return error(400, res, "Not an image.")

		const imagePath = path.join(__dirname, `../public/images/${prevImage}`);

		await fs.promises.unlink(imagePath)

		return success({ filename }, 201, res)
	}
	catch(e) {
		return error(500, res)
	}
}
