import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IoIosArrowForward } from "react-icons/io"

import CircleLoader from "../../CircleLoader"
import { getUserApi } from "../../../api/api"
import { getUser } from "../../../lib/utils"

type InformationProps = {
	label: string
	onClick: () => void
	subLabel?: string
}

export default function AccountInformation() {
	const [loading, setLoading] = useState(false)
	const [user, setUser] = useState<User>()
	const persistedUser: AuthUser = getUser()

	useEffect(() => {
		(async () => {
			setLoading(true)

			try {
				const { data } = await getUserApi(persistedUser?.email)

				setUser(data)
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
	
	const Information = ({ label, onClick, subLabel }: InformationProps) => <>
		<div onClick={onClick} className="v-center-bet p-2 w rounded-r5 pointer text-dvio transition-all hover:bg-vio/30">
			<div>
				<p>{label}</p>
				{subLabel ? <p className="text-12">{subLabel}</p> : null}
			</div>
			<IoIosArrowForward />
		</div>
	</>

	return <>
		{loading ? <CircleLoader /> : <>
			<div className="h w pt-3 px-3">
			<p className="vio-label text-20 text-center mb-3">Account Information</p>
			<Information label="Name" onClick={() => {}} />
			<Information label="Username" onClick={() => {}} subLabel={`@${user?.username}`} />
			<Information label="Email" onClick={() => {}} subLabel={user?.email} />
			<Information label="Password" onClick={() => {}} />
			<Information label="Birthday" onClick={() => {}} subLabel={user?.birthday} />
			<Information label="Interests" onClick={() => {}} />
		</div>
		</>}
	</>
}
