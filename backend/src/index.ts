import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import userRoutes from '../routes/user'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 2217

app.use(cookieParser())
app.use(cors())
app.use(express.json({ limit: '30mb' }))
app.use(express.urlencoded({ limit: '30mb' }))

app.use("", userRoutes)

mongoose.connect(process.env.DB_URL as string)
	.then(() => app.listen(PORT, () => console.log(`Server is running in port: ${PORT}`)))
	.catch(e => console.log(`Error: ${e}`))
