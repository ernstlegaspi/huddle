import { AiFillMessage, AiOutlineMessage } from "react-icons/ai"
import { BsPersonAdd } from "react-icons/bs"
import { BsPersonFillAdd } from "react-icons/bs"
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io"

import HoverableIcon from "../../../HoverableIcon"

export default function UserNav() {
	const handleClick = async () => {

	}

	return <div className="v-center">
		<HoverableIcon hoverIcon={BsPersonFillAdd} mainIcon={BsPersonAdd} onClick={() => {}} />
		<HoverableIcon hoverIcon={AiFillMessage} mainIcon={AiOutlineMessage} onClick={() => {}} />
		<HoverableIcon hoverIcon={IoIosNotifications} mainIcon={IoIosNotificationsOutline} onClick={() => {}} />
		<p onClick={handleClick} className="lemon hover:text-dvio text-vio ml-3 font-medium pointer tracking-wider">Logout</p>
	</div>
}