import { create } from 'zustand'

type Props = {
	nameUsername: { name: string, username: string }
	setNameUsername: (newVal: { name: string, username: string }) => void
}

const useNameUsername = create<Props>((set) => ({
	nameUsername: { name: '', username: '' },
	setNameUsername: (newVal: { name: string, username: string }) => set({ nameUsername: newVal })
}))

export default useNameUsername
