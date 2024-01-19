import { useState } from "react"
import { IconType } from "react-icons"

type Props = {
	hoverIcon: IconType
	mainIcon: IconType
	onClick: () => void
}

export default function HoverableIcon({ hoverIcon: Hover, mainIcon: Main, onClick }: Props) {
	const [hovered, setHovered] = useState(false)
	
	return <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="w-max h-max rounded-full pointer transition-all hover:bg-vio/15 p-2 text-vio">
		{hovered ? <Hover size={22} /> : <Main size={22} />}
	</div>
}