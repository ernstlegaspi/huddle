import toast from "react-hot-toast"
import { useState } from "react"
import { axiosError } from "../../../../lib/utils"

import ProfilePicture from "../../../ProfilePicture"
import VioButton from "../../../VioButton"
import useCurrentUser from "../../../../hooks/useCurrentUser"
import { addNotification } from "../../../../api/notification/post"
import { appendToRequestsSent } from "../../../../api/user/put"
import { socket } from "../../../../App"

export default function OtherUserCard({ otherUser }: { otherUser: User }) {
	const [clicked, setClicked] = useState(false)
	const { currentUser } = useCurrentUser()
	const id = otherUser._id as string
	const requestSent = currentUser.requestsSent as string[]
	const hasSentRequest = requestSent.includes(id)

	const handleClick = async () => {
		try {
			setClicked(true)

			await Promise.all([
				addNotification({
					content: 'Sent a friend request',
					email: currentUser.email,
					name: currentUser.name,
					otherUserId: currentUser._id as string,
					ownerId: id,
					picture: currentUser.picture as string,
					type: 'add friend'
				}),
				appendToRequestsSent({ email: currentUser.email, otherUserId: id })
			])

			socket.emit('send-notification', true, id)
		}
		catch(e) {
			setClicked(false)
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
		<VioButton label={`${clicked || hasSentRequest ? 'Request Sent' : 'Add'}`} loading={false || clicked || hasSentRequest} onClick={handleClick} />
	</div>
}
