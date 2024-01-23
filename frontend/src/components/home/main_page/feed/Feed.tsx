import { lazy, Suspense } from 'react'
import { useSelector } from "react-redux"

import { Skeleton } from '../../../ui/skeleton'

const Profile = lazy(() => import("./Profile"))

export default function Feed() {
	const viewProfile = useSelector((state: any) => state.ui.viewProfile)

	return <div className={`${viewProfile ? 'px-6' : 'px-10'} relative h-auto w-[43%]`}>
		<Suspense fallback={<p>Loading</p>}>
			{viewProfile ? <Profile /> : <>
				<p>Stories</p>
					<Skeleton className="w-[100px] h-[20px] rounded-full bg-blue-500" />
				<p>Stories 2</p>
			</>}
		</Suspense>
	</div>
}
