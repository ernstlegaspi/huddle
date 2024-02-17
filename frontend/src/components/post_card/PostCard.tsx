import toast from 'react-hot-toast'
import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FaComment, FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa"

import 'react-lazy-load-image-component/src/effects/blur.css'

import ProfilePicture from '../ProfilePicture'
import useNameUsername from '../../hooks/useNameAndUsername'
import useCurrentUser from '../../hooks/useCurrentUser'
import useIsProfilePictureRemove from '../../hooks/useIsProfilePictureRemove'
import useGlobalLoading from '../../hooks/useGlobalLoading'
import UserActions from './UserActions'
import { Skeleton } from '../ui/skeleton'
import { serverURL } from '../../constants'
import { axiosError } from '../../lib/utils'
import { updateLike } from '../../api/post/update'

export default function PostCard({ post }: { post: Post }) {
	const [hover, setHover] = useState(false)
	const { currentUser } = useCurrentUser()
	const { nameUsername } = useNameUsername()
	const { isProfilePictureRemove } = useIsProfilePictureRemove()
	const { globalLoading } = useGlobalLoading()

	const handlePostClick = () => {
		if(hover) return

		alert(`Post: ${post.name}`)
	}

	const handleLikeClick = async () => {
		try {
			await updateLike({ email: currentUser.email, postId: post._id as string, likerId: currentUser._id as string })
		}
		catch(e) {
			toast.error(axiosError(e, 'Can not like post. Try again later.'))
		}
	}

	return <div onClick={handlePostClick} className="bg-white rounded-r5 w p-2 pointer transition-all hover:shadow-md hover:shadow-vio/70">
		<LazyLoadImage
			src={`${serverURL}images/${post.pictures}`}
			alt={post.pictures}
			className="w h-[300px] rounded-r5"
		/>
		<div className="w f justify-between mt-3">
			<div className="f">
				<div className="mt-1 mr-3">
					{
						globalLoading ? <Skeleton className="w-[35px] h-[35px] rounded-full bg-vio" />
						: currentUser.picture || post.userPicture && !isProfilePictureRemove ? <div className="w-[35px] h-[35px]">
							<ProfilePicture picture={currentUser.picture ? currentUser.picture as string : post.userPicture } />
						</div>
						: <ProfilePicture picture='' />
					}
				</div>
				<div>
					<p className="text-dark font-bold">{nameUsername.name ? nameUsername.name : post.name}</p>
					<p className="text-dvio text-14 mt-[-5px]">@{nameUsername.username ? nameUsername.username : post.username}</p>
				</div>
			</div>
			<div className="f">
				<UserActions
					activeIcon={FaHeart}
					count={post?.likes?.length as Number}
					hasMargin={true}
					icon={FaRegHeart}
					onClick={handleLikeClick}
					setHover={setHover}
				/>
				<UserActions
					activeIcon={FaComment}
					count={0}
					icon={FaRegComment}
					onClick={() => {}}
					setHover={setHover}
				/>
			</div>
		</div>
		<div className="w h-end flex-col text-14 mt-6">
			<p className="text-vio">{post.tags.map(tag => `#${tag.trim()} `)}</p>
			<p className="break-words text-dark">{post.body}</p>
		</div>
	</div>
}
