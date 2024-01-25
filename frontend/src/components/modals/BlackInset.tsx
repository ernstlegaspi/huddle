import { useState } from 'react'

type Props = {
	children: React.ReactNode
	close: () => void
}

export default function BlackInset({ children, close }: Props) {
	const [hovered, setHovered] = useState(false)

	const handleClick = () => {
		if(hovered) return

		document.body.style.overflow = 'auto'
		close()
	}
	
	return <div onClick={handleClick} className="black-inset">
		<div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="w-max h-max">
			{children}
		</div>
	</div>
}
