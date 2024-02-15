import { create } from 'zustand'

type Props = {
	feedLoading: boolean
	setFeedLoading: (newVal: boolean) => void
}

const useFeedLoading = create<Props>((set) => ({
	feedLoading: false,
	setFeedLoading: (newVal: boolean) => set({ feedLoading: newVal })
}))

export default useFeedLoading
