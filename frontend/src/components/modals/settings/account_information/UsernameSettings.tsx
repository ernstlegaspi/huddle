import toast from "react-hot-toast"
import { ChangeEvent, useState } from "react"

import AccountForm from "./Form"
import useCurrentUser from "../../../../hooks/useCurrentUser"
import useNameUsername from "../../../../hooks/useNameAndUsername"
import { updateUsername } from "../../../../api/api"
import { axiosError, setPersistedUser, usernameRegEx } from "../../../../lib/utils"

export default function UsernameSettings({ setSettingsContent }: { setSettingsContent: React.Dispatch<React.SetStateAction<string>> }) {
	const { currentUser, setCurrentUser } = useCurrentUser()
	const { setNameUsername } = useNameUsername()
	const [loading, setLoading] = useState(false)
	const [username, setUsername] = useState(currentUser.username)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value)
	}

	const handleSubmit = async () => {
		try {
			if(!username) {
				toast.error('Username field is required.')
				return
			}

			if(username === currentUser.username) {
				toast.error('There are no changes in username.')
				return
			}

			if(!usernameRegEx.test(username)) {
				toast.error("Enter a valid username")
				return
			}

			setLoading(true)

			await updateUsername({ email: currentUser.email, username })

			setCurrentUser({ ...currentUser, username })

			setPersistedUser({
				name: currentUser.name,
				email: currentUser.email,
				username,
				picture: currentUser.picture
			})

			setNameUsername({ name: currentUser.name, username })
			setLoading(false)
			setSettingsContent('')
		}
		catch(e) {
			setLoading(false)
			toast.error(axiosError(e, "Can not update username. Try again later."))
		}
	}

	return <AccountForm
		handleSubmit={handleSubmit}
		inputLabel="Username"
		label="Change Username"
		loading={loading}
		name="username"
		onChange={handleChange}
		placeholder="Username..."
		setSettingsContent={setSettingsContent}
		value={username}
	/>
}
