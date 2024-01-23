import { useEffect } from 'react'
import { BiDotsHorizontalRounded } from "react-icons/bi"

import ProfilePicture from "../../../ProfilePicture"
import PostCard from "../../../PostCard"
import HoverableIcon from "../../../HoverableIcon"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentUserPosts } from '../../../../slices/post/postSlice'
import { getPostsPerUser } from '../../../../api/api'
import toast from 'react-hot-toast'

export default function Profile() {
	const user: AuthUser = useSelector((state: any) => state.auth.userInfo)
	const posts: Post[] = useSelector((state: any) => state.posts.currentUserPosts)
	const dispatch = useDispatch()

	useEffect(() => {
		(async () => {
			try {
				const { data } = await getPostsPerUser()

        console.log(data)
        
				dispatch(setCurrentUserPosts(data.posts))
			}
			catch(e) {
				toast.error("Can not get your posts. Try logging in again.")
			}
		})()
	}, [dispatch])

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
			<div className="w f justify-between p-3 text-dark">
				<div>
					<p className="font-bold text-20">{user.name}</p>
					<p className="text-dvio">{user.username}</p>
				</div>
				<HoverableIcon hoverIcon={BiDotsHorizontalRounded} mainIcon={BiDotsHorizontalRounded} onClick={() => {}} />
			</div>
		</div>
		<div className="mt-3"></div>
		<div className="grid grid-cols-2 gap-3">
			{
				!posts || posts.length < 1 ? <p>Loading...</p> : posts.map((post, idx) => <PostCard key={idx} post={post} />)
			}
		</div>
	</div>
}
