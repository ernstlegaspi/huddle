import otp from 'otp-generator'
import nodeMailer from 'nodemailer'
import { Request, Response } from 'express'
import { catchError, success } from '../utils'

export const emailOtp = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { to } = req.body

		const email = process.env.EMAIL
		const newOtp = otp.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })

		const transporter = nodeMailer.createTransport({
			service: 'gmail',
			secure: true,
			auth: {
				user: email,
				pass: process.env.PASSWORD
			}
		})

		await transporter.sendMail({
			from: email,
			to,
			subject: "Huddle Generated OTP",
			html: `
				<p>Your code: <span style="color: #afa6b7;">${newOtp}</span></p>
			`
		})

		return success({ otp: newOtp }, 200, res)
	}, res)
}
