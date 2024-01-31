import { LazyLoadImage } from 'react-lazy-load-image-component'
import { IoClose } from "react-icons/io5"

import 'react-lazy-load-image-component/src/effects/blur.css'

import { useViewProfilePictureModal } from '../../hooks/useToggleModal'
import { useState } from 'react'
import useCurrentPhoto from '../../hooks/useCurrentPhoto'

export default function ViewPhotoModal() {
	const [hovered, setHovered] = useState(false)
	const { currentPhoto } = useCurrentPhoto()
	const { close, isOpen } = useViewProfilePictureModal()

	if(!isOpen) return null

	const handleClick = () => {
		if(hovered) return
		close()
	}
	
	return <div onClick={handleClick} className="inset-0 fixed z-[100] bg-dark/50">
		<div onClick={close} className="absolute bg-white/40 p-2 rounded-full pointer transition-all hover:bg-white mt-2 ml-2">
			<IoClose size={20} />
		</div>
		<div className="s f-center">
			<LazyLoadImage
				onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
				effect='blur'
				src={`http://localhost:3001/images/${currentPhoto}`}
				className="rounded-full w-[400px] h-[400px]"
			/>
		</div>
	</div>
}
