import { useEffect } from 'react'
import { IconType } from "react-icons"
import { BsCalendar3Event } from "react-icons/bs"
import { FaPeopleCarry } from "react-icons/fa"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineSpaceDashboard } from "react-icons/md"
import { PiTelevisionSimple } from "react-icons/pi"
import { RiStore2Line } from "react-icons/ri"

import useViewProfile from '../../../../hooks/useViewProfile'
import useActiveSidebar from '../../../../hooks/useActiveSidebar'
import { useSettingsModal } from '../../../../hooks/useToggleModal'

type ButtonProps = {
	icon: IconType
	onClick: () => void
	text: string
}

export default function SidebarNav() {
	const persisted = localStorage.getItem('active_sidebar') as string
	const activeSidebar = persisted ? persisted : ''
	const { isClicked, toggle } = useViewProfile()
	const { activeSidebar: sidebar, setActiveSidebar } = useActiveSidebar()
	const { open } = useSettingsModal()

	useEffect(() => {
		if(!activeSidebar || persisted.toLowerCase() === 'settings') {
			localStorage.setItem('active_sidebar', 'feed')
			setActiveSidebar('feed')
		}
	}, [])

	const handleSettingsClick = () => {
		open()
	}

	const SidebarButton = ({ icon: Icon, onClick, text }: ButtonProps) => {
		const isActive = (activeSidebar.toLowerCase() === text.toLowerCase() || sidebar === text) && !isClicked && !localStorage.getItem('view_profile')

		const handleClick = () => {
			onClick()
			setActiveSidebar(text)
			toggle('')
			localStorage.setItem('active_sidebar', text)
			localStorage.setItem('view_profile', '')
		}

		return <div onClick={handleClick} className={`
			${isActive ? 'text-vio font-medium rounded-r-r5 bg-white shadow shadow-vio/75 w-[107%]' : 'text-dark pointer hover:bg-vio/30'}
			v-center relative overflow-x-hidden pl-4 py-3 transition-all
		`}>
			<div className={`${isActive ? 'absolute' : 'hidden'} py-2 bg-vio rounded-full w-[10px] h-[30px] left-[-5px]`}></div>
			{isActive ? <Icon className="ml-1" size={23} /> : <Icon size={22} />}
			<p className={`${isActive ? 'text-[17px]' : ''} ml-2`}>{text}</p>
		</div>
	}

	return <div className="mt-4">
		<SidebarButton icon={MdOutlineSpaceDashboard} onClick={() => {}} text="Feed" />
		<SidebarButton icon={FaPeopleCarry} onClick={() => {}} text="Friends" />
		<SidebarButton icon={BsCalendar3Event} onClick={() => {}} text="Events" />
		<SidebarButton icon={PiTelevisionSimple} onClick={() => {}} text="Video" />
		<SidebarButton icon={RiStore2Line} onClick={() => {}} text="Marketplace" />
		<SidebarButton icon={IoSettingsOutline} onClick={handleSettingsClick} text="Settings" />
	</div>
}
