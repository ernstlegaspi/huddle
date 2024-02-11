import { create } from 'zustand'

type Props = {
	feedPosts: number
	setFeedPosts: (newVal: number) => void
}

const useFeedPosts = create<Props>((set) => ({
	feedPosts: 0,
	setFeedPosts: (newVal: number) => set({ feedPosts: newVal })
}))

export default useFeedPosts
