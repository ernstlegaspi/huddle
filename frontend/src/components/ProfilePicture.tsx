import { LazyLoadImage } from 'react-lazy-load-image-component'

import 'react-lazy-load-image-component/src/effects/blur.css'

export default function ProfilePicture() {
	return <div>
		<LazyLoadImage
			src="/assets/images/placeholder.webp"
			alt="User Profile"
			effect='blur'
			width={35}
			height={35}
			className="rounded-full"
		/>
	</div>
}
