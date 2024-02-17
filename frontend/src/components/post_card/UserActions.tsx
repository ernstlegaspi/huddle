import { useState } from 'react'
import { IconType } from 'react-icons'

type Props = {
	activeIcon: IconType
	count: Number
	hasMargin?: Boolean,
	icon: IconType
	onClick: () => void
	setHover: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserActions({ activeIcon: ActiveIcon, count, hasMargin, icon: Icon, onClick, setHover }: Props) {
	const [hovered, setHovered] = useState(false)

	const handleEnter = () => {
		setHovered(true)
		setHover(true)
	}

	const handleLeave = () => {
		setHovered(false)
		setHover(false)
	}

	return <div onClick={onClick} onMouseEnter={handleEnter} onMouseLeave={handleLeave} className={`${hasMargin ? 'mr-3' : ''} v-center text-dark`}>
		{hovered ? <ActiveIcon size={20} className="mt-[2px] mr-1 text-vio" /> : <Icon size={20} className="mt-[2px] mr-1" />}
		<p>{count === 0 ? '' : count.toString()}</p>
	</div>
}
