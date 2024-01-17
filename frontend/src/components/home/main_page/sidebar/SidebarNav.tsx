import { useEffect } from 'react'
import { IconType } from "react-icons"
import { BsCalendar3Event } from "react-icons/bs"
import { FaPeopleCarry } from "react-icons/fa"
import { MdOutlineSpaceDashboard } from "react-icons/md"
import { PiTelevisionSimple } from "react-icons/pi"
import { RiStore2Line } from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux'
import { setActiveSidebar } from '../../../../slices/ui/uiSlice'

type ButtonProps = {
	icon: IconType
	onClick: () => void
	text: string
}

export default function SidebarNav() {
	const activeSidebar = useSelector((state: any) => state.ui.activeSidebar)
	const dispatch = useDispatch()

	useEffect(() => {
		if(Object.keys(activeSidebar).length < 1) dispatch(setActiveSidebar('feed'))
	}, [])

	const SidebarButton = ({ icon: Icon, onClick, text }: ButtonProps) => {
		const isActive = activeSidebar.toLowerCase() === text.toLowerCase()

		return <div onClick={() => {
			onClick()
			dispatch(setActiveSidebar(text))
		}} className={`
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
	</div>
}
