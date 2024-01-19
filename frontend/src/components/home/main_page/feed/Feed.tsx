import { lazy, Suspense } from 'react'
import { useSelector } from "react-redux"

const Profile = lazy(() => import("./Profile"))

export default function Feed() {
	const viewProfile = useSelector((state: any) => state.ui.viewProfile)

	return <div className={`${viewProfile ? 'px-6' : 'px-10'} relative h-auto w-[43%]`}>
		<Suspense fallback={<p>Loading</p>}>
			{viewProfile ? <Profile /> : <><p>Stories</p></>}
		</Suspense>
	</div>
}
