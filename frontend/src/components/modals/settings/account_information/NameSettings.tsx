import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { IoIosArrowBack } from "react-icons/io"

import Input from "../../../Input"
import HoverableIcon from "../../../HoverableIcon"
import { nameRegex } from "../../../../lib/utils"
import { updateName } from "../../../../api/api"
import useCurrentUser from "../../../../hooks/useCurrentUser"
import useNameUsername from "../../../../hooks/useNameAndUsername"
import AccountForm from "./Form"

export default function NameSetting({ setSettingsContent }: { setSettingsContent: Dispatch<SetStateAction<string>> }) {
	const { currentUser } = useCurrentUser()
	const { setNameUsername } = useNameUsername()
	const [name, setName] = useState(currentUser.name)
	const [loading, setLoading] = useState(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
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

			if(name.trim() === currentUser.name.trim()) {
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
			setLoading(false)

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

	return <AccountForm
		handleSubmit={handleSubmit}
		inputLabel="Name"
		label="Change Name"
		loading={loading}
		name="name"
		onChange={handleChange}
		placeholder="Name..."
		setSettingsContent={setSettingsContent}
		value={name}
	/>
}
