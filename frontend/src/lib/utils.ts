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
