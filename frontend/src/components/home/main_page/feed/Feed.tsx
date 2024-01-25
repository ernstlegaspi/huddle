import { lazy, Suspense } from 'react'

import SkeletonProfile from './SkeletonProfile'
import useViewProfile from '../../../../hooks/useViewProfile'

const Profile = lazy(() => import("./Profile"))

export default function Feed() {
	const viewProfile = localStorage.getItem('view_profile')
	const { isClicked } = useViewProfile()
	const inProfile = isClicked || viewProfile

	return <div className={`${inProfile ? 'px-6' : 'px-10'} relative h-auto w-[50%]`}>
		<Suspense fallback={inProfile ? <SkeletonProfile /> : <p>FeedLudeng</p>}>
			{inProfile ? <Profile /> : <>
				<p>Stories</p>
				<p>Stories 2</p>
			</>}
		</Suspense>
	</div>
}
