import toast from "react-hot-toast"
import { useState } from "react"

import ProfilePicture from "../ProfilePicture"
import useCurrentUser from "../../hooks/useCurrentUser"
import { acceptFriendRequest, deleteNotification } from "../../api/api"

export default function FriendRequestNotificationCard({ notification }: { notification: TNotification }) {
	const [clicked, setClicked] = useState(false)
	const [loading, setLoading] = useState(false)
	const { currentUser } = useCurrentUser()

	const handleDelete = async () => {
		setClicked(true)

		try {
			setLoading(true)
			await deleteNotification(currentUser.email, notification._id as string)
			setLoading(false)
		}
		catch(e) {
			setClicked(false)
			setLoading(false)
			toast.error('Can not delete friend request. Try again later.')
		}
	}

	const handleAccept = async () => {
		setClicked(true)

		try {
			setLoading(true)

			await Promise.all([
				acceptFriendRequest({
					email: currentUser.email,
					userId: currentUser._id as string,
					friendId: notification.otherUserId
				}),
				handleDelete()
			])

			setLoading(false)
		}
		catch(e) {
			setClicked(false)
			setLoading(false)
			toast.error('Can not accept friend request. Try again later.')
		}
	}

	return <div className={`
		${clicked ? 'hidden' : 'flex'}
		notification-card mb-1
	`}>
		<div className="v-center">
			<ProfilePicture width={42} height={42} picture={notification.picture} />
			<div className="ml-[10px]">
				<p className="font-medium">{notification.name}</p>
				<p className="text-14">{notification.content}</p>
			</div>
		</div>
		<div>
			<button disabled={loading} onClick={handleAccept} className={`
				${loading ? 'bg-vio/30' : 'bg-vio v'}
				rounded-r5 bg-vio text-white py-1 px-3 transition-all
			`}>Confirm</button>
			<button disabled={loading} onClick={handleDelete} className={`
				${loading ? 'bg-dark/30' : 'hover:bg-black bg-dark'}
				rounded-r5 text-white py-1 px-3 ml-1 transition-all
			`}>Delete</button>
		</div>
	</div>
}
