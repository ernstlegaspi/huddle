import { AxiosError } from "axios"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getPersistedUser = () => {
	const user = localStorage.getItem("huddle_user")

	return user ? JSON.parse(user) : ''
}

export const clearLocalStorage = () => {
	localStorage.removeItem('huddle_user')
	localStorage.removeItem('view_profile')
	localStorage.removeItem('active_sidebar')
}

export const setPersistedUser = (data: AuthUser) => {
	localStorage.setItem('huddle_user', JSON.stringify(data))
}

export const birthdayFormatter = (day: string, month: string, year: string) => `${month} ${day}, ${year}`

export const axiosError = (e: any, errorMessage: string) => {
	if(e instanceof AxiosError) {
		const data = e?.response?.data
		const { message }: { message: string } = data

		return message
	}

	return errorMessage
}

export const isValidPassword = (password: string) => password.length >= 8 && password.length <= 20

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
export const emailRegex2 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
export const nameRegex = /^[a-zA-Z\s]+$/
export const usernameRegEx = /^[a-zA-Z_]+$/
export const MAX_FILE_SIZE = 1048576 // 1 mb
