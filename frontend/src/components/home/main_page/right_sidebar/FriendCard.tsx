import toast from "react-hot-toast"
import { axiosError } from "../../../../lib/utils"

import ProfilePicture from "../../../ProfilePicture"
import VioButton from "../../../VioButton"
import useCurrentUser from "../../../../hooks/useCurrentUser"
import { addNotification } from "../../../../api/api"

export default function OtherUserCard({ otherUser }: { otherUser: User }) {
	const { currentUser } = useCurrentUser()

	const handleClick = async () => {
		try {
			await addNotification({
				content: 'Sent a friend request',
				email: currentUser.email,
				name: currentUser.name,
				otherUserId: currentUser._id as string,
				ownerId: otherUser._id as string,
				picture: currentUser.picture as string,
				type: 'add friend'
			})
			toast.success('Friend request sent.')
		}
		catch(e) {
			toast.error(axiosError(e, "Can not add friend. Try again later."))
		}
	}

	return <div className="v-center-bet w py-2 px-2 mb-3">
		<div className="v-center">
			<ProfilePicture picture={otherUser.picture as string} />
			<div className="text-vio ml-2">
				<p>{otherUser.name}</p>
				<p className="text-14">@{otherUser.username}</p>
			</div>
		</div>
		<VioButton label="Add" loading={false} onClick={handleClick} />
	</div>
}
