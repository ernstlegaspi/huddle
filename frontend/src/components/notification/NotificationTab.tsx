import toast from "react-hot-toast"
import { useEffect, useState } from "react"

import FriendRequestNotificationCard from "./FriendRequestNotificationCard"
import CircleLoader from "../CircleLoader"
import useCurrentUser from "../../hooks/useCurrentUser"
import { axiosError } from "../../lib/utils"
import { getUserNotification } from "../../api/notification/get"
import { updateHasNotification } from "../../api/user/put"
import useUserNotification from "../../hooks/useUserNotification"

export default function NotificationTab() {
	const [loading, setLoading] = useState(false)
	const [notifications, setNotifications] = useState<TNotification[]>([])
	const { currentUser } = useCurrentUser()
	const { setUserNotification } = useUserNotification()

	useEffect(() => {
		(async () => {
			try {
				let res = null

				setLoading(true)

				if(currentUser.hasNotification) {
					const [data] = await Promise.all([
						getUserNotification(currentUser.email),
						updateHasNotification({ email: currentUser.email })
					])

					res = data.data

					setUserNotification(true)
				}
				else {
					const { data } = await getUserNotification(currentUser.email)
					res = data
				}

				setLoading(false)
				setNotifications(res)
			}
			catch(e) {
				setLoading(false)
				toast.error(axiosError(e, 'Can not get notifications. Try again later.'))
			}
		})()
	}, [])

	return <div className="z-[70] h-[90%] fixed rounded-r5 bg-white shadow-sm shadow-dark/40 w-[400px] right-7 mt-[60px] scroll">
		{loading ? <CircleLoader /> : notifications.length < 1 ? null : notifications.map(notification => {
			if(notification.type === 'add friend') return <FriendRequestNotificationCard key={notification._id} notification={notification} />
			
			return <p>{notification.type}</p>
		})}
	</div>
}
