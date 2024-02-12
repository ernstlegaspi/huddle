import toast from "react-hot-toast"
import { useEffect, useState } from "react"

import useCurrentUser from "../../../../hooks/useCurrentUser"
import useGlobalLoading from "../../../../hooks/useGlobalLoading"
import CircleLoader from "../../../CircleLoader"
import PostCard from "../../../PostCard"
import useFeedPosts from "../../../../hooks/useFeedPosts"
import { getFriendsPosts } from "../../../../api/post/get"

export default function MainFeed() {
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState(false)
	const { currentUser } = useCurrentUser()
	const { globalLoading } = useGlobalLoading()
	const { setFeedPosts } = useFeedPosts()

	useEffect(() => {
		(async () => {
			setLoading(true)

			try {
				if(globalLoading) return

				const userFriends = currentUser.friends?.join('-')

				if(!userFriends) return

				const { data } = await getFriendsPosts(currentUser.email, userFriends as string)

				setPosts(data)
				setFeedPosts(data.length)
			}
			catch(e) {
				toast.error('Can not fetch posts. Try again later')
			}
			finally {
				setLoading(false)
			}
		})()
	}, [globalLoading])

	return <div>
		<p>For you</p>
		{
			!loading && posts.length < 1 && !globalLoading ? <p>There are no posts to display.</p>
			: loading ? <div className="mt-6">
				<CircleLoader />
			</div>
			: <div className="grid grid-cols-2 gap-3 my-6">
				{posts.map(post => <PostCard key={post.id as string} post={post} />)}
			</div>
		}
	</div>
}
