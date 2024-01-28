import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { IoIosArrowForward } from "react-icons/io"

import CircleLoader from "../../../CircleLoader"
import { getUserApi } from "../../../../api/api"
import { getUser } from "../../../../lib/utils"
import useCurrentUser from "../../../../hooks/useCurrentUser"

type InformationProps = {
	label: string
	subLabel?: string
}

type Props = {
	setSettingsContent: Dispatch<SetStateAction<string>>
}

export default function AccountInformation({ setSettingsContent }: Props) {
	const { currentUser, setCurrentUser } = useCurrentUser()
	const [loading, setLoading] = useState(false)
	const persistedUser: AuthUser = getUser()

	useEffect(() => {
		(async () => {
			setLoading(true)

			try {
				const { data } = await getUserApi(persistedUser?.email)

				setCurrentUser(data)
				setLoading(false)
			}
			catch(e) {
				if(e instanceof AxiosError) {
					const error: AxiosError = e

					if(error?.response?.status === 404) {
						toast.error('Invalid user.')
						return
					}
				}

				toast.error('Can not get user information. Try again later.')
			}
		})()
	}, [])
	
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

	return <>
		{loading ? <CircleLoader /> : <>
			<div className="s pt-3 px-3">
			<p className="vio-label text-20 text-center mb-3">Account Information</p>
			<Information label="Name" />
			<Information label="Username" subLabel={`@${currentUser?.username}`} />
			<Information label="Email" subLabel={currentUser?.email} />
			<Information label="Password" />
			<Information label="Birthday" subLabel={currentUser?.birthday} />
			<Information label="Interests" />
		</div>
		</>}
	</>
}
