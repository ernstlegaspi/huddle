import toast from "react-hot-toast"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"

import useCurrentUser from "../../../../hooks/useCurrentUser"
import useNameUsername from "../../../../hooks/useNameAndUsername"
import AccountForm from "./Form"
import { updateName } from "../../../../api/user/put"
import { axiosError, nameRegex, setPersistedUser } from "../../../../lib/utils"

export default function NameSetting({ setSettingsContent }: { setSettingsContent: Dispatch<SetStateAction<string>> }) {
	const { currentUser, setCurrentUser } = useCurrentUser()
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

			setCurrentUser({ ...currentUser, name })
			setNameUsername({ name, username: currentUser.username })
			setSettingsContent('')
			setPersistedUser({
				name,
				email: currentUser?.email,
				username: currentUser?.username,
				picture: currentUser?.picture
			})

			setLoading(false)
		}
		catch(e) {
			setLoading(false)
			toast.error(axiosError(e, "Error updating your name. Try again later"))
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
