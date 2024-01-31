import { create } from 'zustand'

type Props = {
	isProfilePictureRemove: boolean
	setIsProfilePictureRemove: (newVal: boolean) => void
}

const useIsProfilePictureRemove = create<Props>((set) => ({
	isProfilePictureRemove: false,
	setIsProfilePictureRemove: (newVal: boolean) => set({ isProfilePictureRemove: newVal })
}))

export default useIsProfilePictureRemove
