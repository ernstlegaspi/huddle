import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FaRegHeart } from "react-icons/fa"

import 'react-lazy-load-image-component/src/effects/blur.css'
import ProfilePicture from './ProfilePicture'
import useNameUsername from '../hooks/useNameAndUsername'
import useCurrentPhoto from '../hooks/useCurrentPhoto'

export default function PostCard({ post }: { post: Post }) {
	const { currentPhoto } = useCurrentPhoto()
	const { nameUsername } = useNameUsername()
	const likeCount = post.likes ? post.likes.length < 1 ? '' : post.likes.length : ''

	return <div className="bg-white rounded-r5 w p-2 pointer transition-all hover:shadow-md hover:shadow-vio/70">
		<LazyLoadImage
			src={`http://localhost:3001/images/${post.pictures}`}
			alt="Mountains"
			className="w h-[300px] rounded-r5"
		/>
		<div className="w f justify-between mt-3">
			<div className="f">
				<div className="mt-1 mr-3">
					{
						currentPhoto || post.userPicture ? <div className="w-[35px] h-[35px]">
							<ProfilePicture picture={currentPhoto ? currentPhoto : post.userPicture } />
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
				<div className="v-center text-dark">
					<FaRegHeart className="mt-[2px] mr-1" />
					<p>{likeCount}</p>
				</div>
				<div className="v-center text-dark ml-3">
					<FaRegHeart className="mt-[2px] mr-1" />
					<p>100</p>
				</div>
			</div>
		</div>
		<div className="w h-end flex-col text-14 mt-6">
			<p className="text-vio">{post.tags.map(tag => `#${tag.trim()} `)}</p>
			<p className="break-words text-dark">{post.body}</p>
		</div>
	</div>
}
