import toast from "react-hot-toast"
import { useEffect, useState } from "react"

import FriendRequestNotificationCard from "./FriendRequestNotificationCard"
import useCurrentUser from "../../hooks/useCurrentUser"
import { getUserNotification } from "../../api/api"
import { axiosError } from "../../lib/utils"
import CircleLoader from "../CircleLoader"

export default function NotificationTab() {
	const [loading, setLoading] = useState(false)
	const [notifications, setNotifications] = useState<TNotification[]>([])
	const { currentUser } = useCurrentUser()

	useEffect(() => {
		(async () => {
			try {
				setLoading(true)

				const { data } = await getUserNotification(currentUser.email)

				setLoading(false)
				setNotifications(data)
			}
			catch(e) {
				setLoading(false)
				toast.error(axiosError(e, 'Can not get notifications. Try again later.'))
			}
		})()
	}, [])

	return <div className="z-[70] h-[90%] fixed rounded-r5 bg-white shadow-sm shadow-dark/40 w-[400px] right-7 mt-[60px] scroll">
		{loading ? <CircleLoader /> : notifications.length < 1 ? null : notifications.map(notification => {
			if(notification.type === 'add friend') return <FriendRequestNotificationCard notification={notification} />
			
			return <p>{notification.type}</p>
		})}
	</div>
}
