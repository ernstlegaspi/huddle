import { lazy, Suspense } from 'react'
import { useSelector } from "react-redux"

import { Skeleton } from '../../../ui/skeleton'
import SkeletonProfile from './SkeletonProfile'

const Profile = lazy(() => import("./Profile"))

export default function Feed() {
	const viewProfile = useSelector((state: any) => state.ui.viewProfile)

	return <div className={`${viewProfile ? 'px-6' : 'px-10'} relative h-auto w-[50%]`}>
		<Suspense fallback={viewProfile ? <SkeletonProfile /> : <p>FeedLudeng</p>}>
			{viewProfile ? <Profile /> : <>
				<p>Stories</p>
				<p>Stories 2</p>
			</>}
		</Suspense>
	</div>
}
