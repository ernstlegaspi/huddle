import { Request, Response } from 'express'

import Notification from '../models/notification'
import { catchError, getUserId, success } from '../utils'

export const addNotification = async (req: Request, res: Response) => {
	return catchError(async () => {
		await new Notification({ ...req.body }).save()

		return success({}, 201, res)
	}, res)
}

export const deleteNotification = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { id } = req.params
		
		await Notification.findByIdAndDelete(id)

		return success({}, 200, res)
	}, res)
}

export const getUserNotification = async (req: Request, res: Response) => {
	return catchError(async () => {
		const userId = getUserId(req)

		const userNotification = await Notification.find({ ownerId: userId })

		return success(userNotification, 200, res)
	}, res)
}
