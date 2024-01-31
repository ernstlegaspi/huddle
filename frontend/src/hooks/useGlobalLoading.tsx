import { create } from 'zustand'

type Props = {
	globalLoading: boolean
	setGlobalLoading: (newVal: boolean) => void
}

const useGlobalLoading = create<Props>((set) => ({
	globalLoading: false,
	setGlobalLoading: (newVal: boolean) => set({ globalLoading: newVal })
}))

export default useGlobalLoading
