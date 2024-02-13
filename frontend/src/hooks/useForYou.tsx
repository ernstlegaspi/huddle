import { create } from 'zustand'

type Props = {
	isForYou: boolean
	setIsForYou: (newVal: boolean) => void
}

const useForYou = create<Props>((set) => ({
	isForYou: false,
	setIsForYou: (newVal: boolean) => set({ isForYou: newVal })
}))

export default useForYou
