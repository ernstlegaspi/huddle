import express from 'express'
import { addPost, getPostsPerUser } from '../controllers/post'
import { checkMiddleware } from '../middleware'

const router = express.Router()

router.post('/addPost', checkMiddleware, addPost)
router.get('/getPostsPerUser/:page', checkMiddleware, getPostsPerUser)

export default router
