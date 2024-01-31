import { useState } from 'react'
import { IoClose } from "react-icons/io5"

import { useViewCoverPhotoModal } from '../../hooks/useToggleModal'

import useCurrentUser from '../../hooks/useCurrentUser'

export default function ViewCoverPhotoModal() {
	const [hovered, setHovered] = useState(false)
	const { close, isOpen } = useViewCoverPhotoModal()
	const { currentUser } = useCurrentUser()

	if(!isOpen) return null

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
			<div className="w-[80%] h-[90%]">
				<img
					onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
					src={`http://localhost:3001/images/${currentUser.coverPhoto}`}
					className="relative rounded-r5 s"
				/>
			</div>
		</div>
	</div>
}
