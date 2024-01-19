import express from 'express'
import multer from 'multer'
import path from 'path'
import { checkMiddleware } from '../middleware'
import { temporaryPostImageUpload } from '../controllers/imageUpload'

const router = express.Router()

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images')
	},
	filename: (req, file, cb) => {
		cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
	}
})

const upload = multer({ storage })

router.post('/upload/post-image', checkMiddleware, upload.single('file'), temporaryPostImageUpload)

export default router
