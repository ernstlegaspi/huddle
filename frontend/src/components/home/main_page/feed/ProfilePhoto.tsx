import { ChangeEvent, useState } from "react"

import ProfilePicture from "../../../ProfilePicture"
import { MAX_FILE_SIZE, axiosError } from "../../../../lib/utils"
import toast from "react-hot-toast"
import { updatePicture, uploadImage } from "../../../../api/api"
import useCurrentPhoto from "../../../../hooks/useCurrentPhoto"

export default function ProfilePhoto({ user }: { user: User }) {
	const [profilePicture, setProfilePicture] = useState(user.picture)
	const { setCurrentPhoto } = useCurrentPhoto()

	const handleChangePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
		try {
			const file = e.target.files

			if(!file || file.length < 1) return

			if(file[0].size > MAX_FILE_SIZE) {
				toast.error('Maximum file size is 1 MB')
				return
			}

			const formData = new FormData()
			formData.append('file', file[0])

			const { data } = await uploadImage(formData)

			await updatePicture({ email: user.email, picture: data.filename })

			localStorage.setItem('huddle_user', JSON.stringify({
				email: user.email,
				name: user.name,
				username: user.username,
				picture: data.filename
			}))

			setCurrentPhoto(data.filename)
			setProfilePicture(data.filename)
		}
		catch(e) {
			toast.error(axiosError(e, "Can not upload photo. Try again later."))
		}
	}

	return <>
		{
			profilePicture ?
				<div className="rounded-full pointer bg-red-500 relative z-20 w-max left-1/2 translate-x-[-50%] h-center mt-[-85px]">
					<div className="w-[150px] h-[150px]">
						<ProfilePicture picture={profilePicture} width={150} height={150} />
					</div>
				</div>
			:
			<>
				<label htmlFor="profilePicture" className="rounded-full block pointer relative z-20 w-max left-1/2 translate-x-[-50%] h-center mt-[-85px]">
					<ProfilePicture picture='' width={150} height={150} />
				</label>
				<input type="file" id="profilePicture" accept="image/*" className="hidden" onChange={handleChangePhoto} />
			</>
		}
	</>
}
