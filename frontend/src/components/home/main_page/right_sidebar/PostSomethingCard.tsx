import ProfilePicture from "../../../ProfilePicture"
import { useAddPostModal } from "../../../../hooks/useToggleModal"
import useCurrentPhoto from "../../../../hooks/useCurrentPhoto"
import { getPersistedUser } from "../../../../lib/utils"

export default function PostSomethingCard() {
	const { currentPhoto } = useCurrentPhoto()
	const { open } = useAddPostModal()
	const user: AuthUser = getPersistedUser()
	
	const handleClick = () => {
		open()
		document.body.style.overflow = 'hidden'
	}

	return <div className="card w">
		<p className="vio-label p-3">Post Something</p>
		<div className="w border-t border-vio/30 f p-3">
			<div className="mt-[3px]">
				{
					currentPhoto || user.picture ? <div className="w-[35px] h-[35px]">
						<ProfilePicture picture={currentPhoto ? currentPhoto : user?.picture as string} />
					</div>
					: <ProfilePicture picture='' />
				}
			</div>
			<div onClick={handleClick} className="w h-max p-2 rounded-full text-dvio pointer transition-all hover:bg-vio/30 ml-2">
				<p>What's on your mind?</p>
			</div>
		</div>
	</div>
}