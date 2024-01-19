import { create } from 'zustand'

type Props = {
	isOpen: boolean
	close: () => void
	open: () => void
}

const useAddPostModal = create<Props>(set => ({
	isOpen: false,
	close: () => set({ isOpen: false }),
	open: () => set({ isOpen: true })
}))

export default useAddPostModal
