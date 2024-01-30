import toast from "react-hot-toast"
import { ChangeEvent, useState } from "react"

import CloseButton from "../../CloseButton"
import Input from "../../Input"
import BlackInset from "../BlackInset"
import { useEditProfileModal } from "../../../hooks/useToggleModal"
import { getPersistedUser, nameRegex, setPersistedUser, usernameRegEx } from "../../../lib/utils"
import { updateProfile } from "../../../api/api"
import { AxiosError } from "axios"
import useNameUsername from "../../../hooks/useNameAndUsername"

export default function EditProfileModal() {
	const user: AuthUser = getPersistedUser()
	const [data, setData] = useState({ name: user?.name, username: user?.username })
	const [loading, setLoading] = useState(false)
	const { close, isOpen } = useEditProfileModal()
	const { setNameUsername } = useNameUsername()

	if(!isOpen) return null

	const handleClose = () => {
		if(loading) return
		
		close()
		document.body.style.overflow = "auto"
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value })
	}

	const handleSubmit = async () => {
		if(loading) return

		try {
			const { name, username } = data

			if(!name || !username) {
				toast.error('All fields are required')
				return
			}

			if(!nameRegex.test(name)) {
				toast.error('Enter a valid name')
				return
			}

			if(!usernameRegEx.test(username)) {
				toast.error('Enter a valid username')
				return
			}

			if(name === user?.name && username === user?.username) {
				toast.error('Name or Username should be different on the existing value.')
				return
			}

			setLoading(true)

			const res = await updateProfile({
				email: user?.email,
				name: data.name,
				username: data.username
			})

			setPersistedUser({
				...res.data,
				email: user?.email,
				picture: user?.picture
			})

			setLoading(false)
			setNameUsername({ name: data.name, username: data.username })
			toast.success('Profile Updated.')
			handleClose()
		}
		catch(e) {
			setLoading(false)

			if(e instanceof AxiosError) {
				const error: AxiosError = e

				if(error?.response?.status === 401) {
					toast.error('User is not existing.')
					return
				}

				const { message }: { message: string } = error?.response?.data as { message: string }

				if(message) {
					toast.error(message)
					return
				}
			}

			toast.error("Can not update profile. Try again later.")
		}
	}

	return <BlackInset close={close}>
		<div className="card h-auto w-[400px]">
			<div className="v-center-bet w p-2 pr-4 border-b border-vio/30">
				<CloseButton disabled={loading} handleClose={handleClose} />
				<p className="vio-label text-20">Edit Profile</p>
				<button onClick={handleSubmit} className={`
					${loading ? 'bg-vio/30 default' : 'pointer bg-vio hover:bg-dvio'}
					rounded-r5 text-white py-1 px-4 transition-all 
				`}>
					Save
				</button>
			</div>
			<div className="px-4 mt-2 py-4">
				<Input
					disabled={loading}
					label="Name"
					name="name"
					onChange={handleChange}
					placeholder="Change name..."
					type="text"
					value={data.name}
				/>

				<div className="h-[25px]"></div>

				<Input
					disabled={loading}
					label="Username"
					name="username"
					onChange={handleChange}
					placeholder="Change username..."
					type="text"
					value={data.username}
				/>
			</div>
		</div>
	</BlackInset>
}
