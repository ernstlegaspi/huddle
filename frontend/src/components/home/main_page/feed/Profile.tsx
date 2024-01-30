import toast from 'react-hot-toast'
import { useEffect, useRef, useState } from 'react'

import PostCard from "../../../PostCard"
import SkeletonPostCard from '../../../SkeletonPostCard'
import CircleLoader from '../../../CircleLoader'
import useNameUsername from '../../../../hooks/useNameAndUsername'
import usePostsCount from '../../../../hooks/usePostsCount'
import useCurrentUser from '../../../../hooks/useCurrentUser'
import ProfilePhoto from './ProfilePhoto'
import { useEditProfileModal } from '../../../../hooks/useToggleModal'
import { getPostsPerUser, getUserApi } from '../../../../api/api'
import { axiosError, getUser } from '../../../../lib/utils'
import { Skeleton } from '../../../ui/skeleton'

export default function Profile() {
	const page = useRef(0)
	const canRefetch = useRef(true)
	const shownUserPostsCount = useRef(0)
	const userPostsLength = useRef(0)
	const postsRef = useRef<Post[]>([])
	const { postsCount, setPostsCount } = usePostsCount()
	const { nameUsername } = useNameUsername()

	const [isRefetching, setIsRefetching] = useState(false)
	const [loading, setLoading] = useState(false)
	const [posts, setPosts] = useState<Post[]>([])

	const persistedUser: AuthUser = getUser()
	const { open } = useEditProfileModal()
	const { currentUser, setCurrentUser } = useCurrentUser()

	useEffect(() => {
		(async () => {
			try {
				setLoading(true)

				const [user, posts] = await Promise.all([
					getUserApi(persistedUser.email), getPostsPerUser(0, persistedUser?.email)
				])

				setCurrentUser(user.data)

				shownUserPostsCount.current = posts.data.posts.length
				userPostsLength.current = posts.data.length
				postsRef.current = posts.data.posts
				setPosts(posts.data.posts)
				setLoading(false)
				setPostsCount(posts.data.posts.length)
			}
			catch(e) {
				setLoading(false)
				setPosts([])
				setPostsCount(0)
				toast.error(axiosError(e, "Can not view your profile. Try again later."))
			}
		})()
	}, [persistedUser?.email])

	useEffect(() => {
		const handleScroll = async () => {
			if(shownUserPostsCount.current >= userPostsLength.current) return

			const windowHeight = window.innerHeight
			const scrollTop = document.documentElement.scrollTop
			const scrollHeight = document.documentElement.scrollHeight

			if((windowHeight + scrollTop === scrollHeight) && canRefetch.current) {
				page.current++
				canRefetch.current = false
				setIsRefetching(true)

				try {
					const { data } = await getPostsPerUser(page.current, persistedUser?.email)
					const newPosts = [...postsRef.current]

					shownUserPostsCount.current += data.posts.length

					for(let f=0; f<data.posts.length; f++) {
						newPosts.push(data.posts[f])
					}

					canRefetch.current = true
					setIsRefetching(false)
					setPosts(newPosts)
				}
				catch(e) {
					toast.error('Can not get posts. Try again later.')
					canRefetch.current = true
					setIsRefetching(false)
				}
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [persistedUser?.email])

	const handleClick = () => {
		document.body.style.overflow = "hidden"
		open()
	}

	return <div className="w h py-6 relative">
		<div className="w bg-vio/50 rounded-r5 h-[300px]">

		</div>
		<>
			{
				loading ?
				<Skeleton className="rounded-full bg-vio w-[150px] relative z-20 h-[150px] left-1/2 translate-x-[-50%] h-center mt-[-85px]" />
				: <ProfilePhoto user={currentUser} />
			}
		</>
		<div className="relative z-10 w-max left-1/2 translate-x-[-50%] h-center mt-[-160px]">
			<div className="relative z-10 h-center rounded-full bg-gl h-[170px] w-[170px]"></div>
		</div>
		<div className="relative z-0 w bg-white rounded-r5 mt-[-63px]">
			<div className="w v-center justify-between p-3 text-dark">
				<div>
					<p className="font-bold text-20">{nameUsername.name  ? nameUsername.name : persistedUser.name}</p>
					<p className="text-dvio">@{nameUsername.username ? nameUsername.username : persistedUser.username}</p>
				</div>
				<button onClick={handleClick} className="h-max bg-vio outline-none py-2 px-4 rounded-r5 text-white transition-all hover:bg-dvio">
					Edit Profile
				</button>
			</div>
		</div>
		<div className="mt-3"></div>
		<div className="grid grid-cols-2 gap-3">
			{
				postsCount === 0
				? <p className="text-vio tracking-wider text-20">You have no posts.</p>
				: loading
				? <>
					<SkeletonPostCard />
					<SkeletonPostCard />
					<SkeletonPostCard />
					<SkeletonPostCard />
				</>
				: posts && posts.map((post, idx) => <PostCard key={idx} post={post} />)
			}
		</div>
		<div className="my-7"></div>
		{isRefetching ? <CircleLoader /> : null}
	</div>
}
