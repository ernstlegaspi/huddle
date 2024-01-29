import { lazy, Suspense, useTransition, useState } from "react"
import { IconType } from "react-icons"
import { IoPersonOutline } from "react-icons/io5"
import { MdBlock, MdLockOutline } from "react-icons/md"

import BlackInset from "../BlackInset"
import useActiveSidebar from "../../../hooks/useActiveSidebar"
import CloseButton from "../../CloseButton"
import CircleLoader from "../../CircleLoader"
import { useSettingsModal } from "../../../hooks/useToggleModal"
import PasswordSettings from "./account_information/change_password/PasswordSettings"

const AccountInformation = lazy(() => import("./account_information/AccountInformation"))
const EmailSettings = lazy(() => import("./account_information/email_settings/EmailSettings"))
const NameSettings = lazy(() => import("./account_information/NameSettings"))
const UsernameSettings = lazy(() => import("./account_information/UsernameSettings"))

type SettingsNavProps = {
	icon: IconType
	label: string
}

export default function SettingsModal() {
	// eslint-disable-next-line
	const [_, startTransition] = useTransition()
	const [activeSettings, setActiveSettings] = useState('')
	const [settingsContent, setSettingsContent] = useState('')
	const { setActiveSidebar } = useActiveSidebar()
	const { close, isOpen } = useSettingsModal()

	if(!isOpen) return null

	const handleClose = () => {
		setActiveSidebar('feed')
		localStorage.setItem('active_sidebar', 'feed')
		setSettingsContent('')
		setActiveSettings('')

		close()
	}

	const SettingsTab = ({ icon: Icon, label }: SettingsNavProps) => {
		const isActive = activeSettings === label.toLowerCase()

		const handleClick = () => {
			setActiveSettings(label.toLowerCase())

			if(label.toLowerCase() === 'account') return
			setSettingsContent('')
		}

		return <div onClick={() => startTransition(() => handleClick())} className={`
			${isActive ? 'bg-vio/30 text-dvio border-l-[3px] border-dvio font-medium' : 'text-vio'}
			transition-all px-4 v-center pointer w py-3 hover:bg-vio/30 hover:text-dvio
		`}>
			<Icon size={18} />
			<p className="ml-2 tracking-wider">{label}</p>
		</div>
	}

	return <BlackInset close={handleClose}>
		<div className="card h-[600px] w-[800px] relative f">
			<div className="scroll relative z-20 h w-[300px] rounded-l-r5 bg-white border-r-2 border-vio/30">
				<div className="w v-center-bet p-2">
					<CloseButton handleClose={handleClose} />
					<p className="vio-label text-20 ml-[-25px]">Settings</p>
					<div></div>
				</div>
				<SettingsTab icon={IoPersonOutline} label="Account" />
				<SettingsTab icon={MdLockOutline} label="Privacy" />
				<SettingsTab icon={MdBlock} label="Block" />
			</div>
			<div className="bg-white flex-1 h rounded-r-r5">
				<Suspense fallback={<CircleLoader />}>
					{activeSettings === 'account' && settingsContent === '' ? <AccountInformation setSettingsContent={setSettingsContent} /> : null}
					{settingsContent === 'email' ? <EmailSettings setSettingsContent={setSettingsContent} /> : null}
					{settingsContent === 'name' ? <NameSettings setSettingsContent={setSettingsContent} /> : null}
					{settingsContent === 'username' ? <UsernameSettings setSettingsContent={setSettingsContent} /> : null}
					{settingsContent === 'password' ? <PasswordSettings setSettingsContent={setSettingsContent} /> : null}
				</Suspense>
			</div>
		</div>
	</BlackInset>
}
