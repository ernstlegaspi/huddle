import toast from "react-hot-toast"
import { ChangeEvent, useState } from "react"

import ProfilePicture from "../../../ProfilePicture"
import useCurrentUser from "../../../../hooks/useCurrentUser"
import { useChangePictureModal } from "../../../../hooks/useToggleModal"
import { updatePhoto, uploadImage } from "../../../../api/api"
import { MAX_FILE_SIZE, axiosError } from "../../../../lib/utils"
import useGlobalLoading from "../../../../hooks/useGlobalLoading"
import { Skeleton } from "../../../ui/skeleton"

export default function ProfilePhoto() {
	const [loading, setLoading] = useState(false)
	const { currentUser, setCurrentUser } = useCurrentUser()
	const { open } = useChangePictureModal()
	const { globalLoading } = useGlobalLoading()

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

			await updatePhoto({
				email: currentUser.email,
				isCoverPhoto: false,
				picture: data.filename
			})

			setCurrentUser({ ...currentUser, picture: data.filename })
			setLoading(false)
		}
		catch(e) {
			setLoading(false)
			toast.error(axiosError(e, "Can not upload photo. Try again later."))
		}
	}

	const handleProfileClick = () => {
		open()
		document.body.style.overflow = 'hidden'
	}

	return <>
		{
			globalLoading ? <Skeleton className="rounded-full bg-vio w-[150px] h-[150px] relative z-20 left-1/2 translate-x-[-50%] h-center mt-[-85px]" />
			: currentUser.picture ?
				<div onClick={handleProfileClick} className="rounded-full pointer relative z-20 w-max left-1/2 translate-x-[-50%] h-center mt-[-85px]">
					<div className="w-[150px] h-[150px]">
						<ProfilePicture picture={currentUser.picture} width={150} height={150} />
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
