import { Dispatch, SetStateAction } from "react"
import { IoIosArrowForward } from "react-icons/io"

import useCurrentUser from "../../../../hooks/useCurrentUser"

type InformationProps = {
	label: string
	subLabel?: string
}

type Props = {
	setSettingsContent: Dispatch<SetStateAction<string>>
}

export default function AccountInformation({ setSettingsContent }: Props) {
	const { currentUser } = useCurrentUser()
	
	const Information = ({ label, subLabel }: InformationProps) => {
		const handleClick = () => {
			setSettingsContent(label.toLowerCase())
		}

		return <div onClick={handleClick} className="v-center-bet p-2 w rounded-r5 pointer text-dvio transition-all hover:bg-vio/30">
			<div>
				<p>{label}</p>
				{subLabel ? <p className="text-12">{subLabel}</p> : null}
			</div>
			<IoIosArrowForward />
		</div>
	}

	return <div className="s pt-3 px-3">
		<p className="vio-label text-20 text-center mb-3">Account Information</p>
		<Information label="Name" />
		<Information label="Username" subLabel={`@${currentUser?.username}`} />
		<Information label="Email" subLabel={currentUser?.email} />
		<Information label="Password" />
		<Information label="Birthday" subLabel={currentUser?.birthday} />
		<Information label="Interests" />
	</div>
}
