import { create } from 'zustand'

type Props = {
	isClicked: string
	toggle: (newVal: string) => void
}

const useViewProfile = create<Props>((set) => ({
	isClicked: '',
	toggle: (newVal: string) => set({ isClicked: newVal })
}))

export default useViewProfile
