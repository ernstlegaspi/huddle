import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { IoIosArrowBack } from "react-icons/io"

import Input from "../../Input"
import HoverableIcon from "../../HoverableIcon"
import { nameRegex } from "../../../lib/utils"
import { updateName } from "../../../api/api"
import useCurrentUser from "../../../hooks/useCurrentUser"
import useNameUsername from "../../../hooks/useNameAndUsername"

export default function NameSetting({ name: persistedName, setSettingsContent }: { name: string, setSettingsContent: Dispatch<SetStateAction<string>> }) {
	const { currentUser } = useCurrentUser()
	const { setNameUsername } = useNameUsername()
	const [name, setName] = useState(persistedName)
	const [loading, setLoading] = useState(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}

	const handleClick = () => {
		if(loading) return
		
		setSettingsContent('')
	}

	const handleSubmit = async () => {
		try {
			if(!name) {
				toast.error("Name field is required.")
				return
			}

			if(!nameRegex.test(name)) {
				toast.error("Enter a valid name.")
				return
			}

			if(name === currentUser.name) {
				toast.error('There are no changes in the name.')
				return
			}

			setLoading(true)

			await updateName({ email: currentUser.email, name })

			setNameUsername({ name, username: currentUser.username })
			setSettingsContent('')
			localStorage.setItem('huddle_user', JSON.stringify({ name, email: currentUser.email, username: currentUser.username, picture: currentUser.picture }))

			setLoading(false)
		}
		catch(e) {
			if(e instanceof AxiosError) {
				const data = e?.response?.data
				const { message }: { message: string } = data

				if(message) {
					toast.error(message)
					return
				}
			}

			setLoading(false)
			toast.error("Error updating your name. Try again later")
		}
	}

	return <div className="s p-3">
		<div className="mb-5 v-center">
			<HoverableIcon disabled={loading} mainIcon={IoIosArrowBack} onClick={handleClick} />
			<p className="vio-label text-20 ml-1">Change Name</p>
		</div>
		<Input
			disabled={loading}
			type="text"
			value={name}
			onChange={handleChange}
			name="name"
			placeholder="Name..."
			label="Name"
		/>
		<div className="h-end">
			<button onClick={handleSubmit} disabled={!name || loading} className={`
				${name && !loading ? 'bg-vio hover:bg-dvio' : 'bg-vio/30'}
				transition-all text-white rounded-r5 py-2 px-4 mt-3
			`}>{loading ? "Loading..." : "Update"}</button>
		</div>
	</div>
}
