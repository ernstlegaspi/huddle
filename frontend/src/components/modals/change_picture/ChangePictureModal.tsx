import toast from "react-hot-toast"
import { ChangeEvent, useState } from "react"

import BlackInset from "../BlackInset"
import useCurrentPhoto from "../../../hooks/useCurrentPhoto"
import useCurrentUser from "../../../hooks/useCurrentUser"
import { useChangePictureModal, useViewProfilePictureModal } from "../../../hooks/useToggleModal"
import { MAX_FILE_SIZE, axiosError, setPersistedUser } from "../../../lib/utils"
import { removeProfilePicture, updatePicture, uploadImage } from "../../../api/api"

export default function ChangePictureModal() {
	const [loading, setLoading] = useState(false)
	const { setCurrentPhoto } = useCurrentPhoto()
	const { currentUser, setCurrentUser } = useCurrentUser()
	const { close, isOpen } = useChangePictureModal()
	const { open } = useViewProfilePictureModal()

	if(!isOpen) return null

	const UserButton = ({ label, onClick }: { label: string, onClick: () => void }) => <>
		<div onClick={() => {
			if(loading) return

			onClick()
		}} className={`
		${loading ? 'text-dark/50' : 'pointer hover:bg-vio/30 text-dark'}
			w py-2 text-center transition-all
		`}>
			<p>{loading ? "Updating..." : label}</p>
		</div>
	</>

	const handleChangePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
		if(loading) return
		
		try {
			const file = e.target.files

			if(!file || file.length < 1) return

			if(file[0].size > MAX_FILE_SIZE) {
				toast.error('Maximum file size is 1 MB')
				return
			}

			setLoading(true)

			const formData = new FormData()
			formData.append('file', file[0])

			const { data } = await uploadImage(formData)

			await updatePicture({
				changing: true,
				prevProfilePicture: currentUser.picture,
				email: currentUser.email,
				picture: data.filename
			})

			setPersistedUser({
				email: currentUser.email,
				name: currentUser.name,
				username: currentUser.username,
				picture: data.filename
			})
			setCurrentPhoto(data.filename)
			setCurrentUser({ ...currentUser, picture: data.filename })
			setLoading(false)
			close()
		}
		catch(e) {
			setLoading(false)
			toast.error(axiosError(e, "Can not change photo. Try again later."))
		}
	}

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
			setCurrentUser({ ...currentUser, picture: '' })
			setLoading(false)

			close()

			toast.success('Successfully remove profile picture.')
		}
		catch(e) {
			setLoading(false)
			toast.error(axiosError(e, "Can not remove photo. Try again later."))
		}
	}

	const handleViewPhoto = () => {
		setCurrentPhoto(currentUser.picture as string)
		close()
		open()
	}

	return <BlackInset close={close}>
		<div className="card w-[300px]">
			<UserButton label="View Photo" onClick={handleViewPhoto} />

			<label className={`
				${loading ? 'text-dark/50' : 'pointer hover:bg-vio/30 text-dark'}
				w py-2 text-center transition-all
				block
			`} htmlFor="changePhoto">
				{loading ? 'Updating...' : 'Change Photo'}
			</label>

			<input onChange={handleChangePhoto} type="file" accept="image/*" className="hidden" id="changePhoto" />

			<UserButton label="Remove Current Photo" onClick={handleRemovePhoto} />
			<UserButton label="Cancel" onClick={() => close()} />
		</div>
	</BlackInset>
}
