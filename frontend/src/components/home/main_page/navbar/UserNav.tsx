import toast from "react-hot-toast"
import { AiFillMessage, AiOutlineMessage } from "react-icons/ai"
import { BsPersonAdd } from "react-icons/bs"
import { BsPersonFillAdd } from "react-icons/bs"
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io"

import HoverableIcon from "../../../HoverableIcon"
import { signOut } from "../../../../api/api"
import { clearLocalStorage } from "../../../../lib/utils"
import { useNotificationTabModal } from "../../../../hooks/useToggleModal"

export default function UserNav() {
	const { close, isOpen, open } = useNotificationTabModal()

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

	return <div className="v-center">
		<HoverableIcon hoverIcon={BsPersonFillAdd} mainIcon={BsPersonAdd} onClick={() => {}} />
		<HoverableIcon hoverIcon={AiFillMessage} mainIcon={AiOutlineMessage} onClick={() => {}} />
		<HoverableIcon hoverIcon={IoIosNotifications} mainIcon={IoIosNotificationsOutline} onClick={handleNotificationClick} />
		<p onClick={handleClick} className="lemon hover:text-dvio text-vio ml-3 font-medium pointer tracking-wider">Logout</p>
	</div>
}
