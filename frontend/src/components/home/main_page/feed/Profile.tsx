import toast from 'react-hot-toast'
import { useEffect, useRef, useState } from 'react'

import ProfilePicture from "../../../ProfilePicture"
import PostCard from "../../../PostCard"
import SkeletonPostCard from '../../../SkeletonPostCard'
import useNameUsername from '../../../../hooks/useNameAndUsername'
import { useEditProfileModal } from '../../../../hooks/useToggleModal'
import { getPostsPerUser } from '../../../../api/api'
import { getUser } from '../../../../lib/utils'
import { AxiosError } from 'axios'
import CircleLoader from '../../../CircleLoader'

export default function Profile() {
	const page = useRef(0)
	const canRefetch = useRef(true)
	const shownUserPostsCount = useRef(0)
	const userPostsLength = useRef(0)
	const postsRef = useRef<Post[]>([])
	const { nameUsername } = useNameUsername()

	const [isRefetching, setIsRefetching] = useState(false)
	const [posts, setPosts] = useState<Post[]>([])

	const user: AuthUser = getUser()
	const { open } = useEditProfileModal()

	useEffect(() => {
		(async () => {
			try {
				const { data } = await getPostsPerUser(0, user?.email)

				shownUserPostsCount.current = data.posts.length
				userPostsLength.current = data.length
				postsRef.current = data.posts
				setPosts(data.posts)
			}
			catch(e) {
				if(e instanceof AxiosError) {
					const error = e as AxiosError

					if(error?.response?.status === 401) {
						toast.error('User is not existing. Try again later.')
						return
					}
				}

				toast.error("Can not get your posts. Try logging in again.")
				setPosts([])
			}
		})()
	}, [user?.email])

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
				const { data } = await getPostsPerUser(page.current, user?.email)
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
	}, [user?.email])

	const handleClick = () => {
		document.body.style.overflow = "hidden"
		open()
	}

	return <div className="w h py-6 relative">
		<div className="w bg-vio/50 rounded-r5 h-[300px]">

		</div>
		<div className="relative z-20 w-max left-1/2 translate-x-[-50%] h-center mt-[-85px]">
			<ProfilePicture picture={user.picture} width={150} height={150} />
		</div>
		<div className="relative z-10 w-max left-1/2 translate-x-[-50%] h-center mt-[-160px]">
			<div className="relative z-10 h-center rounded-full bg-gl h-[170px] w-[170px]"></div>
		</div>
		<div className="relative z-0 w bg-white rounded-r5 mt-[-63px]">
			<div className="w v-center justify-between p-3 text-dark">
				<div>
					<p className="font-bold text-20">{nameUsername.name  ? nameUsername.name : user.name}</p>
					<p className="text-dvio">@{nameUsername.username ? nameUsername.username : user.username}</p>
				</div>
				<button onClick={handleClick} className="h-max bg-vio outline-none py-2 px-4 rounded-r5 text-white transition-all hover:bg-dvio">
					Edit Profile
				</button>
			</div>
		</div>
		<div className="mt-3"></div>
		<div className="grid grid-cols-2 gap-3">
			{
				!posts || posts.length < 1
				? <>
					<SkeletonPostCard />
					<SkeletonPostCard />
					<SkeletonPostCard />
					<SkeletonPostCard />
				</>
				: posts.map((post, idx) => <PostCard key={idx} post={post} />)
			}
		</div>
		<div className="my-7"></div>
		{isRefetching ? <CircleLoader /> : null}
	</div>
}
