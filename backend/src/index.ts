import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 2217

app.use(cors())
app.use(express.json({ limit: '30mb' }))
app.use(express.urlencoded({ limit: '30mb' }))

mongoose.connect(process.env.DB_URL as string)
	.then(() => app.listen(PORT, () => console.log(`Server is running in port: ${PORT}`)))
	.catch(e => console.log(`Error: ${e}`))
