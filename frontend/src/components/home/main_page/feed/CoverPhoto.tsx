import toast from "react-hot-toast"
import { ChangeEvent, useState } from "react"
import { LazyLoadImage } from 'react-lazy-load-image-component'

import useCurrentUser from "../../../../hooks/useCurrentUser"
import { MAX_FILE_SIZE, axiosError } from "../../../../lib/utils"
import { Skeleton } from "../../../ui/skeleton"
import { useChangeCoverPhotoModal } from "../../../../hooks/useToggleModal"

import 'react-lazy-load-image-component/src/effects/blur.css'
import { updatePhoto } from "../../../../api/user/put"
import { uploadImage } from "../../../../api/post/post"

export default function CoverPhoto() {
	const [loading, setLoading] = useState(false)
	const { open } = useChangeCoverPhotoModal()
	const { currentUser, setCurrentUser } = useCurrentUser()

	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
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

			await updatePhoto({ email: currentUser.email, isCoverPhoto: true, picture: data.filename })

			setLoading(false)
			setCurrentUser({ ...currentUser, coverPhoto: data.filename })
		}
		catch(e) {
			setLoading(false)
			toast.error(axiosError(e, "Can not upload cover photo. Try again later."))
		}
	}

	const handleClick = () => {
		open()
    document.body.style.overflow = 'hidden'
	}

	return <>
		{
			loading ? <Skeleton className="w h-[400px] bg-vio/30" />
			: currentUser.coverPhoto ? <div className="h-[400px] w rounded-r5">
			<div onClick={handleClick} className="pointer overflow-y-hidden h w rounded-r5">
				<LazyLoadImage
					src={`http://localhost:3001/images/${currentUser.coverPhoto}`}
					effect="blur"
					alt="Cover Photo"
					className="s rounded-r5"
				/>
			</div>
			</div>
			: <>
				<label htmlFor="coverPhoto" className="block w bg-vio/50 rounded-r5 h-[400px] pointer" />
				<input id="coverPhoto" type="file" accept="image/*" className="hidden" onChange={handleChange} />
			</>
		}
	</>
}
