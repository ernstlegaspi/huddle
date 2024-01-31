import toast from "react-hot-toast"
import { ChangeEvent, useState } from "react"

import ProfilePicture from "../../../ProfilePicture"
import useCurrentPhoto from "../../../../hooks/useCurrentPhoto"
import useCurrentUser from "../../../../hooks/useCurrentUser"
import { useChangePictureModal } from "../../../../hooks/useToggleModal"
import { updatePhoto, uploadImage } from "../../../../api/api"
import { MAX_FILE_SIZE, axiosError, getPersistedUser, setPersistedUser } from "../../../../lib/utils"

export default function ProfilePhoto() {
	const [loading, setLoading] = useState(false)
	const { currentUser, setCurrentUser } = useCurrentUser()
	const user: AuthUser = getPersistedUser()
	const { open } = useChangePictureModal()
	const { currentPhoto, setCurrentPhoto } = useCurrentPhoto()

	const handleChangePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
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

			await updatePhoto({ email: user.email, isCoverPhoto: false, picture: data.filename })

			setPersistedUser({
				email: user.email,
				name: user.name,
				username: user.username,
				picture: data.filename
			})

			setCurrentUser({ ...currentUser, picture: data.filename })
			setCurrentPhoto(data.filename)
			setLoading(false)
		}
		catch(e) {
			setLoading(false)
			toast.error(axiosError(e, "Can not upload photo. Try again later."))
		}
	}

	const handleProfileClick = () => {
		open()
	}
	
	return <>
		{
			currentPhoto || user.picture ?
				<div onClick={handleProfileClick} className="rounded-full pointer relative z-20 w-max left-1/2 translate-x-[-50%] h-center mt-[-85px]">
					<div className="w-[150px] h-[150px]">
						<ProfilePicture picture={currentPhoto ? currentPhoto : user.picture} width={150} height={150} />
					</div>
				</div>
			:
			<>
				<label htmlFor="profilePicture" className="rounded-full block pointer relative z-20 w-max left-1/2 translate-x-[-50%] h-center mt-[-85px]">
					<ProfilePicture picture='' width={150} height={150} />
				</label>
				<input disabled={loading} type="file" id="profilePicture" accept="image/*" className="hidden" onChange={handleChangePhoto} />
			</>
		}
	</>
}
