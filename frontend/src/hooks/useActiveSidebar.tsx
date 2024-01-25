import { create } from 'zustand'

type Props = {
	activeSidebar: string
	setActiveSidebar: (newVal: string) => void
}

const useActiveSidebar = create<Props>((set) => ({
	activeSidebar: '',
	setActiveSidebar: (newVal: string) => set({ activeSidebar: newVal })
}))

export default useActiveSidebar
