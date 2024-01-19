import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { ChangeEvent, useState } from 'react'
import { BsEmojiSmile } from "react-icons/bs"
import { IoIosImages } from "react-icons/io"
import { IoClose } from "react-icons/io5"
import { useSelector } from 'react-redux'

import useAddPostModal from "../../hooks/useAddPostModal"
import HoverableIcon from "../HoverableIcon"

export default function AddPostModal() {
	const user: AuthUser = useSelector((state: any) => state.auth.userInfo)

	const [body, setBody] = useState('')
	const [postImage, setPostImage] = useState('')
	const [isNext, setIsNext] = useState(false)
	const [file, setFile] = useState<File>()

	const { close, isOpen } = useAddPostModal()

	const MAX_FILE_SIZE = 1048576; // 1 MB

	if(!isOpen) return null

	const handleClose = () => {
		document.body.style.overflow = 'auto'
		close()
	}
	
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setBody(e.target.value)
	}

	const Form = () => <>
		<textarea
			value={body}
			onChange={handleChange}
			className={`${isNext ? 'border-y' : 'border-t'} p-3 resize-none flex-1 border-vio/30 outline-none text-dark`}
			placeholder="What's on your mind?">
		</textarea>
		<div className="h-bet my-2 px-2">
			<HoverableIcon mainIcon={BsEmojiSmile} onClick={() => {}} />
			<button className={`
				${body.length < 1 ? 'default bg-vio/20' : 'pointer bg-vio'}
				text-white px-4 py-2 rounded-full transition-all
			`}>
				Post
			</button>
		</div>
	</>

	const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		try {
			const files = e.target.files

			if(!files || files.length < 1) return

			if(files[0].size > MAX_FILE_SIZE) {
				toast.error('Maximum file size is 1 MB')

				return
			}
			
			const formData = new FormData()
			formData.append('file', files[0])

			const { data } = await axios.post(`http://localhost:3001//upload/post-image`, formData)

			setFile(files[0])
			setPostImage(data.filename)
		}
		catch(e: any) {
			setFile(undefined)
			setPostImage('')
			
			if(e instanceof AxiosError) {
				const { response }: AxiosError = e
				const { message }: { message: string } = response?.data as { message: string }

				if(message.toLowerCase() === "not an image") {
					toast.error('Only image files are allowed.')

					return
				}
			}

			toast.error('Can not upload picture. Try again later.')
		}
	}

	const handleNextClick = () => {
		if(!file) return

		setIsNext(true)
	}

	const handleBackClick = () => {
		setIsNext(false)
	}

	const ImageUpload = () => <div className="border-t border-vio/30 f-center h flex-col">
		{
			file ? <div className="relative w h">
				<img src={`http://localhost:3001/images/${postImage}`} alt="Temporary Post Image" className="w h" />
				<div className="absolute bottom-0 right-0 mb-3 mr-3">
					<HoverableIcon mainIcon={IoIosImages} onClick={() => {}} />
				</div>
			</div>
			: <>
				<p className="text-dark mb-3 font-medium">Upload an image for your post</p>
				<label htmlFor='postPicture' className="block w-max h-max bg-vio text-white rounded-r5 py-2 px-4 pointer">Select from computer</label>
				<input className="hidden" id="postPicture" type="file" accept="image/*" onChange={handleImageUpload} />
			</>
		}
	</div>

	return <div className="z-[60] absolute inset-0 bg-dark/50 f-center">
		<div className="card w-[600px] h-[500px] f flex-col">
			<div className="h-bet items-center p-3">
				<HoverableIcon mainIcon={IoClose} onClick={handleClose} />
				<p className="vio-label">Add Post</p>
				<div className="f">
					{isNext ? <button onClick={handleBackClick} className="bg-vio text-white rounded-r5 py-2 px-4 transition-all mr-3 hover:bg-dvio">Back</button> : null}
					<button onClick={handleNextClick} className={`
						${file ? 'bg-vio hover:bg-dvio' : 'default bg-vio/20'}
						text-white rounded-r5 py-2 px-4 transition-all
					`}>
						Next
					</button>
				</div>
			</div>
			{isNext ? <Form /> : <ImageUpload />}
		</div>
	</div>
}
