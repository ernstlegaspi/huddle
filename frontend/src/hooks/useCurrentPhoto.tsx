import { create } from 'zustand'

type Props = {
	currentPhoto: string
	setCurrentPhoto: (newVal: string) => void
}

const useCurrentPhoto = create<Props>((set) => ({
	currentPhoto: '',
	setCurrentPhoto: (newVal: string) => set({ currentPhoto: newVal })
}))

export default useCurrentPhoto
