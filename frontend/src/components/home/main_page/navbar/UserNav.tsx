import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { IconType } from "react-icons"
import { AiFillMessage, AiOutlineMessage } from "react-icons/ai"
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io"

import HoverableIcon from "../../../HoverableIcon"
import useCurrentUser from "../../../../hooks/useCurrentUser"
import { clearLocalStorage } from "../../../../lib/utils"
import { useNotificationTabModal } from "../../../../hooks/useToggleModal"
import { signOut } from "../../../../api/auth/auth"
import { socket } from "../../../../App"
import useUserNotification from "../../../../hooks/useUserNotification"

type UserNavButtonProps = {
	hasNotification: boolean
	icon: IconType
	icon2: IconType
	onClick: () => void
}

export default function UserNav() {
	const { close, isOpen, open } = useNotificationTabModal()
	const { currentUser, setCurrentUser } = useCurrentUser()
	const { userNotification } = useUserNotification()
	const [hasLiveNotification, setHasLiveNotification] = useState(false)
	const hasNotification = currentUser.hasNotification as boolean

	useEffect(() => {
		(() => {
			socket.on('receive-notification', (message: boolean) => {
				setHasLiveNotification(message)
				setCurrentUser({ ...currentUser, hasNotification: true })
			})
		})()
	}, [])

	const handleClick = async () => {
		try {
			await signOut()
			clearLocalStorage()
			window.location.reload()
		}
		catch(e) {
			toast.error('Can not sign out. Try again.')
		}
	}

	const handleNotificationClick = () => {
		if(isOpen) {
			close()
		}
		else {
			open()
		}
	}

	const UserNavButton = ({ hasNotification: hasNotif, icon: Icon, icon2: Icon2, onClick }: UserNavButtonProps) => <div className="relative h-max w-max">
		{hasNotif && !userNotification ? <div className="bg-vio rounded-full p-1 w-max h-max absolute right-0"></div> : null}
		<HoverableIcon hoverIcon={Icon2} mainIcon={Icon} onClick={onClick} />
	</div>

	return <div className="v-center">
		<UserNavButton hasNotification={false} icon={AiOutlineMessage} icon2={AiFillMessage} onClick={() => {}} />
		<UserNavButton hasNotification={hasLiveNotification || hasNotification} icon={IoIosNotificationsOutline} icon2={IoIosNotifications} onClick={handleNotificationClick} />
		<p onClick={handleClick} className="lemon hover:text-dvio text-vio ml-3 font-medium pointer tracking-wider">Logout</p>
	</div>
}
