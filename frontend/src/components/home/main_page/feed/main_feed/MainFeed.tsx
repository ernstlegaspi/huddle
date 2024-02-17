import toast from "react-hot-toast"
import { lazy, Suspense, useEffect, useState } from "react"

import useCurrentUser from "../../../../../hooks/useCurrentUser"
import useGlobalLoading from "../../../../../hooks/useGlobalLoading"
import useFeedPosts from "../../../../../hooks/useFeedPosts"
import Stories from "./Stories"
import useForYou from "../../../../../hooks/useForYou"
import { getForYouPosts, getFriendsPosts } from "../../../../../api/post/get"
import SkeletonPostCard from "../../../../SkeletonPostCard"
import useFeedLoading from "../../../../../hooks/useFeedLoading"
import CircleLoader from "../../../../CircleLoader"

const ForYouPosts = lazy(() => import('./ForYouPosts'))
const FriendsPosts = lazy(() => import('./FriendsPosts'))

export default function MainFeed() {
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState(false)
	const { currentUser } = useCurrentUser()
	const { globalLoading } = useGlobalLoading()
	const { setFeedPosts } = useFeedPosts()
	const { isForYou, setIsForYou } = useForYou()
	const { feedLoading, setFeedLoading } = useFeedLoading()

	useEffect(() => {
		(async () => {
			setFeedLoading(true)
			setLoading(true)

			document.body.style.overflow = 'hidden'

			try {
				if(globalLoading) return

				let res = null
				let userFriends = currentUser.friends?.join('-')

				if(isForYou) {
					const { data } = await getForYouPosts(currentUser.email, currentUser.interests.join('-'))
					res = data
				}
				else {
					if(userFriends) {
						const { data } = await getFriendsPosts(currentUser.email, userFriends as string)
						res = data
					}
				}

				setPosts(res ? res : [])
				setFeedPosts(res ? res.length : 0)
			}
			catch(e) {
				toast.error('Can not fetch posts. Try again later')
			}
			finally {
				document.body.style.overflow = 'auto'

				setLoading(false)
				setFeedLoading(false)
			}
		})()
	}, [globalLoading, isForYou])

	return <div className='h py-3'>
		<Stories />
		<div className="h-end text-vio text-20 tracking-wider">
			<p onClick={() => setIsForYou(false)} className={`${isForYou ? '' : 'font-bold'} mr-3 pointer hover:text-dvio`}>Friends</p>
			<p onClick={() => setIsForYou(true)} className={`${isForYou ? 'font-bold' : ''} pointer hover:text-dvio`}>For You</p>
		</div>
		{
			!loading && posts.length < 1 && !globalLoading ? <p>There are no posts to display.</p>
			: feedLoading ? <div className='mt-[-200px] h f-center'>
				<CircleLoader />
			</div>
			: <Suspense fallback={<p>Loading</p>}>
				{isForYou ? <ForYouPosts posts={posts} /> : <FriendsPosts posts={posts} />}
			</Suspense>
		}
	</div>
}
