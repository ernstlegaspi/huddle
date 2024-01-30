import toast from "react-hot-toast"
import { useState } from "react"

import BlackInset from "../BlackInset"
import useCurrentPhoto from "../../../hooks/useCurrentPhoto"
import useCurrentUser from "../../../hooks/useCurrentUser"
import { useChangePictureModal } from "../../../hooks/useToggleModal"
import { axiosError, setPersistedUser } from "../../../lib/utils"
import { removeProfilePicture } from "../../../api/api"

export default function ChangePictureModal() {
	const [loading, setLoading] = useState(false)
	const { setCurrentPhoto } = useCurrentPhoto()
	const { currentUser } = useCurrentUser()
	const { close, isOpen } = useChangePictureModal()

	if(!isOpen) return null

	const UserButton = ({ label, onClick }: { label: string, onClick: () => void }) => <>
		<div onClick={() => {
			if(loading) return

			onClick()
		}} className={`
			${loading ? '' : 'pointer hover:bg-vio/30'}
			w py-2 text-center transition-all text-dark
		`}>
			<p>{loading ? "Updating..." : label}</p>
		</div>
	</>

	const handleRemovePhoto = async () => {
		try {
			setLoading(true)
			await removeProfilePicture({ email: currentUser.email, picture: currentUser.picture as string })

			setPersistedUser({
				email: currentUser.email,
				name: currentUser.name,
				username: currentUser.username,
				picture: ''
			})

			setCurrentPhoto('')
			setLoading(false)

			close()

			toast.success('Successfully remove profile picture.')
		}
		catch(e) {
			setLoading(false)
			toast.error(axiosError(e, "Can not remove photo. Try again later."))
		}
	}

	return <BlackInset close={close}>
		<div className="card w-[300px]">
			<UserButton label="View Photo" onClick={() => {}} />
			<UserButton label="Upload Photo" onClick={() => {}} />
			<UserButton label="Remove Current Photo" onClick={handleRemovePhoto} />
			<UserButton label="Cancel" onClick={() => close()} />
		</div>
	</BlackInset>
}
