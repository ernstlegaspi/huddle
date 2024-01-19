import { useState } from "react"
import { IconType } from "react-icons"

type Props = {
	disabled?: boolean
	hoverIcon?: IconType
	mainIcon: IconType
	onClick: () => void
}

export default function HoverableIcon({ disabled, hoverIcon: Hover, mainIcon: Main, onClick }: Props) {
	const [hovered, setHovered] = useState(false)
	
	if(!Hover) Hover = Main

	return <div onClick={disabled ? () => {} : () => onClick()} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
		className={`
			${disabled ? 'default' : 'pointer hover:bg-vio/15'}
			w-max h-max rounded-full transition-all  p-2 text-vio
		`}>
		{hovered ? <Hover size={22} /> : <Main size={22} />}
	</div>
}