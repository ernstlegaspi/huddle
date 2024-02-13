import express from 'express'
import { addPost, getFriendsPosts, getPostsPerUser } from '../controllers/post'
import { checkMiddleware, checkValidEmail, checkValidEmailParams, checkValidUser } from '../middleware'

const router = express.Router()

router.post('/addPost', checkMiddleware, checkValidEmail, checkValidUser, addPost)

router.get('/get-friends-posts/:friends/:email', checkMiddleware, checkValidEmailParams, checkValidUser, getFriendsPosts)
router.get('/getPostsPerUser/:page/:email', checkMiddleware, checkValidEmailParams, checkValidUser, getPostsPerUser)

export default router
