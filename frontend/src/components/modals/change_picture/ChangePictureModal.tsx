import toast from "react-hot-toast"
import { ChangeEvent, useState } from "react"

import UserButton from "./UserButton"
import BlackInset from "../BlackInset"
import useCurrentUser from "../../../hooks/useCurrentUser"
import useIsProfilePictureRemove from "../../../hooks/useIsProfilePictureRemove"
import { useChangePictureModal, useViewProfilePictureModal } from "../../../hooks/useToggleModal"
import { MAX_FILE_SIZE, axiosError } from "../../../lib/utils"
import { removePicture, updatePhoto, uploadImage } from "../../../api/api"

export default function ChangePictureModal() {
	const [loading, setLoading] = useState(false)
	const { currentUser, setCurrentUser } = useCurrentUser()
	const { setIsProfilePictureRemove } = useIsProfilePictureRemove()
	const { close } = useChangePictureModal()
	const { open } = useViewProfilePictureModal()

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

			await updatePhoto({
				changing: true,
				isCoverPhoto: false,
				prevPicture: currentUser.picture,
				email: currentUser.email,
				picture: data.filename
			})

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

			await removePicture({ email: currentUser.email, isCoverPhoto: false, picture: currentUser.picture as string })

			setCurrentUser({ ...currentUser, picture: '' })
			setLoading(false)
			setIsProfilePictureRemove(true)

			close()

			toast.success('Successfully remove profile picture.')
		}
		catch(e) {
			setLoading(false)
			toast.error(axiosError(e, "Can not remove photo. Try again later."))
		}
	}

	const handleClose = () => {
		close()
		document.body.style.overflow = 'auto'
	}

	const handleViewPhoto = () => {
		close()
		open()
		document.body.style.overflow = 'hidden'
	}

	return <BlackInset close={handleClose}>
		<div className="card w-[300px]">
			<UserButton loading={loading} label="View Photo" onClick={handleViewPhoto} />

			<label className={`
				${loading ? 'text-dark/50' : 'pointer hover:bg-vio/30 text-dark'}
				w py-2 text-center transition-all
				block
			`} htmlFor="changePhoto">
				{loading ? 'Updating...' : 'Change Photo'}
			</label>

			<input onChange={handleChangePhoto} type="file" accept="image/*" className="hidden" id="changePhoto" />

			<UserButton loading={loading} label="Remove Current Photo" onClick={handleRemovePhoto} />
			<UserButton loading={loading} label="Cancel" onClick={handleClose} />
		</div>
	</BlackInset>
}
