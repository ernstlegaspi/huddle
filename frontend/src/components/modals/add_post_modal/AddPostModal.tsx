import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { ChangeEvent, useState } from 'react'
import { IoIosImages } from "react-icons/io"
import { IoClose } from "react-icons/io5"
import { useSelector } from 'react-redux'

import useAddPostModal from "../../../hooks/useAddPostModal"
import HoverableIcon from "../../HoverableIcon"
import Form from './Form'
import ImageUpload from './ImageUpload'
import { addPost, changePostImage, uploadPostImage } from '../../../api/api'

export default function AddPostModal() {
	const user: AuthUser = useSelector((state: any) => state.auth.userInfo)
	const currentUserPosts = useSelector((state: any) => state.posts.currentUserPosts)

	const [body, setBody] = useState('')
	const [disabled, setDisabled] = useState(false)
	const [postImage, setPostImage] = useState('')
	const [tags, setTags] = useState('')
	const [isNext, setIsNext] = useState(false)

	const { close, isOpen } = useAddPostModal()

	const MAX_FILE_SIZE = 1048576 // 1 MB

	if(!isOpen) return null

	const handleClose = () => {
		if(disabled) return
		
		document.body.style.overflow = 'auto'
		close()
	}

	const handleNextClick = () => {
		if(!postImage) return

		if(!tags) {
			toast.error('Tags are required.')

			return
		}

		if(!/^[a-zA-Z, ]+$/.test(tags.trim())) {
			toast.error('Enter a valid tags. (e.g. mountains, trees)')

			return
		}
		
		setIsNext(true)
	}

	const handleBackClick = () => {
		setIsNext(false)
	}
	
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setBody(e.target.value)
	}

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

			if(postImage) {
				const { data } = await changePostImage(formData, postImage)
				setPostImage(data.filename)

				return
			}
			
			const { data } = await uploadPostImage(formData)

			setPostImage(data.filename)
		}
		catch(e: any) {
			setPostImage('')
			
			if(e instanceof AxiosError) {
				const { response }: AxiosError = e
				const { message }: { message: string } = response?.data as { message: string }

				if(message.toLowerCase() === "maximum file size is 1 mb") {
					toast.error('Maximum file size is 1 MB')

					return
				}

				if(message.toLowerCase() === "not an image") {
					toast.error('Only image files are allowed.')

					return
				}
			}

			toast.error('Can not upload picture. Try again later.')
		}
	}

	const handlePostClick = async () => {
		try {
			if(!body) {
				toast.error('Form field is required.')

				return
			}

			setDisabled(true)

			const userPicture: string = user.picture ? user.picture as string : ''

			const { data } = await addPost({
				body,
				name: user.name,
				pictures: postImage,
				username: user.username,
				userPicture,
				tags: tags.split(",")
			})
			
			toast.success('New post added.')
			setBody('')
			setTags('')
			setIsNext(false)
			setPostImage('')
			close()
			setDisabled(false)
			document.body.style.overflow = 'auto'
		}
		catch(e) {
			setDisabled(false)

			toast.error('Can not add new post. Try again later.')
		}
	}
	
	return <div className="z-[60] absolute inset-0 bg-dark/50 f-center">
		<div className={`${postImage && !isNext ? 'h-auto' : 'h-[500px]'} card w-[600px] f flex-col`}>
			<div className="h-bet items-center p-3">
				<HoverableIcon mainIcon={IoClose} onClick={handleClose} />
				<div className="v-center">
					<p className="vio-label">Add Post</p>
					{postImage ? <label htmlFor='changePostPicture' className="ml-1">
						<HoverableIcon mainIcon={IoIosImages} onClick={() => {}} />
						<input disabled={disabled} className="hidden" id="changePostPicture" type="file" accept="image/*" onChange={handleImageUpload} />
					</label> : null}
				</div>
				<div className="f">
					{
						isNext ?
							<button disabled={disabled} onClick={handleBackClick}
								className={`
									${disabled ? 'default bg-vio/20' : 'pointer bg-vio hover:bg-dvio'}
									text-white rounded-r5 py-2 px-4 transition-all
								`}>
								Back
							</button>
						: <button disabled={disabled} onClick={handleNextClick} className={`
							${postImage && !disabled ? 'bg-vio hover:bg-dvio' : 'default bg-vio/20'}
							text-white rounded-r5 py-2 px-4 transition-all
						`}>
							Next
						</button>
					}
				</div>
			</div>
			{
				isNext ? <Form
					body={body}
					disabled={disabled}
					handleChange={handleChange}
					handlePostClick={handlePostClick}
					isNext={isNext}
				/> 
				: <ImageUpload
					handleImageUpload={handleImageUpload}
					postImage={postImage}
					setTags={setTags}
					tags={tags}
				/>
			}
		</div>
	</div>
}
