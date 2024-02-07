import { LazyLoadImage } from 'react-lazy-load-image-component'

import 'react-lazy-load-image-component/src/effects/blur.css'
import { serverURL } from '../constants'

type Props = {
	height?: number
	picture?: string
	width?: number
}

export default function ProfilePicture({ height = 35, picture, width = 35 }: Props) {
	return <>
		{picture ? <img
			src={`${serverURL}images/${picture}`}
			alt="User Profile"
			className="rounded-full s"
		/> : <LazyLoadImage
			src="/assets/images/placeholder.webp"
			alt="User Profile"
			effect='blur'
			width={width}
			height={height}
			className="rounded-full"
		/>}
	</>
}
