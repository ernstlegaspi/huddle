import toast from "react-hot-toast"
import { ChangeEvent, useState } from "react"

import BlackInset from "../BlackInset"
import UserButton from "./UserButton"
import useCurrentUser from "../../../hooks/useCurrentUser"
import { useChangeCoverPhotoModal, useViewCoverPhotoModal } from "../../../hooks/useToggleModal"
import { axiosError } from "../../../lib/utils"
import { removePicture, updatePhoto, uploadImage } from "../../../api/api"

export default function ChangeCoverPhotoModal() {
	const [loading, setLoading] = useState(false)
	const { currentUser, setCurrentUser } = useCurrentUser()
	const { close } = useChangeCoverPhotoModal()
	const { open } = useViewCoverPhotoModal()

	const handleRemovePhoto = async () => {
		try {
			setLoading(true)

			await removePicture({ email: currentUser.email, isCoverPhoto: true, picture: currentUser.coverPhoto as string })

			setCurrentUser({ ...currentUser, coverPhoto: '' })
			setLoading(false)

			close()

			toast.success('Successfully remove cover photo.')
		}
		catch(e) {
			setLoading(false)
			toast.error(axiosError(e, "Can not remove cover photo. Try again later."))
		}
	}

	const handleViewPhoto = async () => {
		close()
		open()
		document.body.style.overflow = 'hidden'
	}

	const handleChangePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
		try {
			const file = e.target.files

			if(!file || file.length < 1) return

			const formData = new FormData()
			formData.append('file', file[0])

			setLoading(true)

			const { data } = await uploadImage(formData)

			await updatePhoto({
				changing: true,
				email: currentUser.email,
				isCoverPhoto: true,
				picture: data.filename,
				prevPicture: currentUser.coverPhoto
			})

			setCurrentUser({ ...currentUser, coverPhoto: data.filename })
			setLoading(false)

			close()

			toast.success('Successfully change cover photo.')
		}
		catch(e) {
			setLoading(false)
			toast.error(axiosError(e, "Can not remove cover photo. Try again later."))
		}
	}

	const handleClose = () => {
		close()
		document.body.style.overflow = 'auto'
	}

	return <BlackInset close={handleClose}>
		<div className="card w-[300px]">
			<UserButton label="View Photo" loading={loading} onClick={handleViewPhoto} />
			<label className={`
				${loading ? 'text-dark/50' : 'pointer hover:bg-vio/30 text-dark'}
				w py-2 text-center transition-all
				block
			`} htmlFor="changePhoto">
				{loading ? 'Updating...' : 'Change Photo'}
			</label>

			<input onChange={handleChangePhoto} type="file" accept="image/*" className="hidden" id="changePhoto" />
			<UserButton label="Remove Current Photo" loading={loading} onClick={handleRemovePhoto} />
			<UserButton label="Cancel" loading={loading} onClick={handleClose} />
		</div>
	</BlackInset>
}
