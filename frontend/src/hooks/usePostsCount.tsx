import { create } from 'zustand'

type Props = {
	postsCount: number
	setPostsCount: (newVal: number) => void
}

const usePostsCount = create<Props>((set) => ({
	postsCount: -1,
	setPostsCount: (newVal: number) => set({ postsCount: newVal })
}))

export default usePostsCount
