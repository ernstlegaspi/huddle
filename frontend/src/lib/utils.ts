import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getUser = () => {
	const user = localStorage.getItem("huddle_user")

	return user ? JSON.parse(user) : ''
}

export const clearLocalStorage = () => {
	localStorage.removeItem('huddle_user')
	localStorage.removeItem('view_profile')
	localStorage.removeItem('active_sidebar')
}

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
export const emailRegex2 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
export const nameRegex = /^[a-zA-Z\s]+$/
export const usernameRegEx = /^[a-zA-Z_]+$/
