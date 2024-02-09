import express from 'express'
import { addPost, getFriendsPosts, getPostsPerUser } from '../controllers/post'
import { checkMiddleware, checkValidEmail, checkValidEmailParams, checkValidUser } from '../middleware'

const router = express.Router()

router.post('/addPost', checkMiddleware, addPost)

router.get('/get-friends-posts/:friends/:email', checkMiddleware, checkValidEmailParams, checkValidUser, getFriendsPosts)
router.get('/getPostsPerUser/:page/:email', checkMiddleware, getPostsPerUser)

export default router
