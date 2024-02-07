import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { IoClose } from "react-icons/io5"

import useCurrentUser from '../../hooks/useCurrentUser'
import { useViewProfilePictureModal } from '../../hooks/useToggleModal'

import 'react-lazy-load-image-component/src/effects/blur.css'
import { serverURL } from '../../constants'

export default function ViewProfilePictureModal() {
	const [hovered, setHovered] = useState(false)
	const { currentUser } = useCurrentUser()
	const { close } = useViewProfilePictureModal()

	const handleClose = () => {
		close()
		document.body.style.overflow = 'auto'
	}

	const handleClick = () => {
		if(hovered) return
		handleClose()
	}

	return <div onClick={handleClick} className="inset-0 fixed z-[100] bg-dark/50">
		<div onClick={handleClose} className="absolute bg-white/40 p-2 rounded-full pointer transition-all hover:bg-white mt-2 ml-2">
			<IoClose size={20} />
		</div>
		<div className="s f-center">
			<LazyLoadImage
				onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
				effect='blur'
				src={`${serverURL}images/${currentUser.picture}`}
				className="rounded-full w-[400px] h-[400px]"
			/>
		</div>
	</div>
}
