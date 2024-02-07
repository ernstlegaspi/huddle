import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { Server } from 'socket.io'

import imageUploadRoutes from '../routes/imageUpload'
import otpRoutes from '../routes/otp'
import notificationRoutes from '../routes/notification'
import postRoutes from '../routes/post'
import userRoutes from '../routes/user'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 2217

app.use(cookieParser())

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
)

app.use(express.json({ limit: '30mb' }))
app.use(express.urlencoded({ limit: '30mb' }))
app.use(express.static('public'))

app.use("", imageUploadRoutes)
app.use("", otpRoutes)
app.use("", postRoutes)
app.use("", notificationRoutes)
app.use("", userRoutes)

const server = app.listen(PORT, () => console.log(`Server is running in port: ${PORT}`))

mongoose.connect(process.env.DB_URL as string)
	.then(() => server)
	.catch(e => console.log(`Error: ${e}`))

const io = new Server(server, {
	cors: {
		origin: ['http://localhost:3000']
	}
})

io.on('connect', socket => {
	socket.on('send-notification', (message, room) => {
		if(room) {
			socket.to(room).emit('receive-notification', message)
			socket.leave(room)
		}
	})

	socket.on('join-user-room', room => {
		socket.join(room)
	})

	socket.on('disconnect', () => {
		console.log(`${socket.id} leaves the room`)
	})
})
