import { create } from 'zustand'

type Props = {
	userNotification: boolean
	setUserNotification: (newVal: boolean) => void
}

const useUserNotification = create<Props>((set) => ({
	userNotification: false,
	setUserNotification: (newVal: boolean) => set({ userNotification: newVal })
}))

export default useUserNotification
