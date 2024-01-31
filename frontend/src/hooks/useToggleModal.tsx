import { create } from 'zustand'

type Props = {
	isOpen: boolean
	close: () => void
	open: () => void
}

const createModal = (initialState: { isOpen: boolean }) =>
	create<Props>((set) => ({
		...initialState,
		close: () => set({ isOpen: false }),
		open: () => set({ isOpen: true })
	}))

export const useAddPostModal = createModal({ isOpen: false })
export const useEditProfileModal = createModal({ isOpen: false })
export const useSettingsModal = createModal({ isOpen: false })
export const useChangePictureModal = createModal({ isOpen: false })
export const useChangeCoverPhotoModal = createModal({ isOpen: false })
export const useViewProfilePictureModal = createModal({ isOpen: false })
export const useViewCoverPhotoModal = createModal({ isOpen: false })
