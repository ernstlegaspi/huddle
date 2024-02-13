import toast from "react-hot-toast"
import { lazy, Suspense, useEffect, useState } from "react"

import useCurrentUser from "../../../../../hooks/useCurrentUser"
import useGlobalLoading from "../../../../../hooks/useGlobalLoading"
import CircleLoader from "../../../../CircleLoader"
import useFeedPosts from "../../../../../hooks/useFeedPosts"
import Stories from "./Stories"
import useForYou from "../../../../../hooks/useForYou"
import { getFriendsPosts } from "../../../../../api/post/get"

const ForYouPosts = lazy(() => import('./ForYouPosts'))
const FriendsPosts = lazy(() => import('./FriendsPosts'))

export default function MainFeed() {
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState(false)
	const { currentUser } = useCurrentUser()
	const { globalLoading } = useGlobalLoading()
	const { setFeedPosts } = useFeedPosts()
	const { isForYou, setIsForYou } = useForYou()

	useEffect(() => {
		(async () => {
			setLoading(true)

			try {
				if(globalLoading) return

				let res = null
				const userFriends = currentUser.friends?.join('-')

				if(!userFriends) return

				if(isForYou) {
					// get for you recommendation
				}
				else {
					const { data } = await getFriendsPosts(currentUser.email, userFriends as string)
					res = data
				}

				setPosts(res)
				setFeedPosts(res.length)
			}
			catch(e) {
				toast.error('Can not fetch posts. Try again later')
			}
			finally {
				setLoading(false)
			}
		})()
	}, [globalLoading, isForYou])

	return <div className="py-3">
		<Stories />
		<div className="h-end text-vio text-20 tracking-wider">
			<p onClick={() => setIsForYou(false)} className={`${isForYou ? '' : 'font-bold'} mr-3 pointer hover:text-dvio`}>Friends</p>
			<p onClick={() => setIsForYou(true)} className={`${isForYou ? 'font-bold' : ''} pointer hover:text-dvio`}>For You</p>
		</div>
		{
			!loading && posts.length < 1 && !globalLoading ? <p>There are no posts to display.</p>
			: loading ? <div className="mt-6">
				<CircleLoader />
			</div>
			: <Suspense fallback={<p>Loading</p>}>
				{isForYou ? <ForYouPosts posts={posts} /> : <FriendsPosts posts={posts} />}
			</Suspense>
		}
	</div>
}
