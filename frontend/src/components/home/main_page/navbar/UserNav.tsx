import toast from "react-hot-toast"
import { AiFillMessage, AiOutlineMessage } from "react-icons/ai"
import { BsPersonAdd } from "react-icons/bs"
import { BsPersonFillAdd } from "react-icons/bs"
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io"
import { useDispatch } from "react-redux"

import HoverableIcon from "../../../HoverableIcon"
import { signOut } from "../../../../api/api"
import { signOutAction } from "../../../../slices/auth/authSlice"
import { setViewProfile } from "../../../../slices/ui/uiSlice"

export default function UserNav() {
	const dispatch = useDispatch()

	const handleClick = async () => {
		try {
			await signOut()
			dispatch(signOutAction({}))
			dispatch(setViewProfile(false))
		}
		catch(e) {
			toast.error('Can not sign out. Try again.')
		}
	}

	return <div className="v-center">
		<HoverableIcon hoverIcon={BsPersonFillAdd} mainIcon={BsPersonAdd} onClick={() => {}} />
		<HoverableIcon hoverIcon={AiFillMessage} mainIcon={AiOutlineMessage} onClick={() => {}} />
		<HoverableIcon hoverIcon={IoIosNotifications} mainIcon={IoIosNotificationsOutline} onClick={() => {}} />
		<p onClick={handleClick} className="lemon hover:text-dvio text-vio ml-3 font-medium pointer tracking-wider">Logout</p>
	</div>
}