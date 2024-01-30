import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { ChangeEvent, useState } from 'react'
import { IoIosImages } from "react-icons/io"

import HoverableIcon from "../../HoverableIcon"
import Form from './Form'
import ImageUpload from './ImageUpload'
import BlackInset from '../BlackInset'
import CloseButton from '../../CloseButton'
import { useAddPostModal } from "../../../hooks/useToggleModal"
import { addPost, changePostImage, uploadImage } from '../../../api/api'
import { MAX_FILE_SIZE, axiosError, getPersistedUser } from '../../../lib/utils'

export default function AddPostModal() {
	const user: AuthUser = getPersistedUser()

	const [body, setBody] = useState('')
	const [disabled, setDisabled] = useState(false)
	const [postImage, setPostImage] = useState('')
	const [tags, setTags] = useState('')
	const [isNext, setIsNext] = useState(false)

	const { close, isOpen } = useAddPostModal()

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

			const { data } = await uploadImage(formData)

			setPostImage(data.filename)
		}
		catch(e: any) {
			setPostImage('')
			toast.error(axiosError(e, "Can not upload post image. Try again later."))
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

			await addPost({
				body,
				email: user?.email,
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

			if(e instanceof AxiosError) {
				const error: AxiosError = e

				if(error?.response?.status === 401) {
					toast.error('User is not existing. Try again later.')
					return
				}
				
				toast.error('Can not add new post. Try again later.')
				return
			}

			toast.error('Can not add new post. Try again later.')
		}
	}
	
	return <BlackInset close={handleClose}>
		<div className={`${postImage && !isNext ? 'h-auto' : 'h-[500px]'} card w-[600px] f flex-col`}>
			<div className="h-bet items-center p-3">
				<CloseButton handleClose={handleClose} />
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
	</BlackInset>
}
