import ProfilePicture from "../../../ProfilePicture"
import useCurrentUser from "../../../../hooks/useCurrentUser"
import { useAddPostModal } from "../../../../hooks/useToggleModal"
import useGlobalLoading from "../../../../hooks/useGlobalLoading"
import { Skeleton } from "../../../ui/skeleton"

export default function PostSomethingCard() {
	const { currentUser: user } = useCurrentUser()
	const { open } = useAddPostModal()
	const { globalLoading } = useGlobalLoading()
	
	const handleClick = () => {
		open()
		document.body.style.overflow = 'hidden'
	}

	return <div className="card w">
		<p className="vio-label p-3">Post Something</p>
		<div className="w border-t border-vio/30 f p-3">
			<div className="mt-[3px]">
				{
					globalLoading ? <Skeleton className="w-[35px] h-[35px] rounded-full bg-vio" />
					: user.picture ? <div className="w-[35px] h-[35px]">
						<ProfilePicture picture={user?.picture as string} />
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
