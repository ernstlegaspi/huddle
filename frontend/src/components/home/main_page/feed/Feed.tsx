import { lazy, Suspense } from 'react'

import SkeletonProfile from './SkeletonProfile'
import useViewProfile from '../../../../hooks/useViewProfile'
import FriendsTab from './friends/Friends'
import SkeletonFriendsTab from './friends/SkeletonFriendsTab'
import useGlobalLoading from '../../../../hooks/useGlobalLoading'
import useActiveSidebar from '../../../../hooks/useActiveSidebar'
import MainFeed from './MainFeed'

const Profile = lazy(() => import("./Profile"))

export default function Feed() {
	const persistedActiveSidebar = localStorage.getItem('active_sidebar')?.toLowerCase()
	const viewProfile = localStorage.getItem('view_profile')
	const { activeSidebar } = useActiveSidebar()
	const { isClicked } = useViewProfile()
	const inProfile = isClicked || viewProfile
	const inFriends = activeSidebar === 'friends' || persistedActiveSidebar === 'friends' && !inProfile
	const inMainFeed = activeSidebar === 'feed' || persistedActiveSidebar === 'feed' && !inProfile
	const { globalLoading } = useGlobalLoading()

	return <div className={`${inProfile ? 'px-6' : 'px-10'} relative h-auto w-[50%]`}>
		<Suspense fallback={
			inFriends ? <SkeletonFriendsTab />
			: inProfile ? <SkeletonProfile />
			: <p>FeedLudeng</p>
		}>
			{
				inMainFeed ? <MainFeed />
				: inFriends && globalLoading ? <SkeletonFriendsTab />
				: inFriends ? <FriendsTab />
				: inProfile ? <Profile />
				: <>
					<p>Stories</p>
					<p>Stories 2</p>
				</>
			}
		</Suspense>
	</div>
}
