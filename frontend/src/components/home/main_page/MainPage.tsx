import { lazy, Suspense } from 'react'
import SkeletonHomepage from '../SkeletonHomepage'
import usePostsCount from '../../../hooks/usePostsCount'
import useGlobalLoading from '../../../hooks/useGlobalLoading'
import SkeletonFriendsBar from './friends_bar/SkeletonFriendsBar'
import useFeedLoading from '../../../hooks/useFeedLoading'
import useActiveSidebar from '../../../hooks/useActiveSidebar'

const Feed = lazy(() => import("./feed/Feed"))
const FriendsBar = lazy(() => import("./friends_bar/FriendsBar"))
const Navbar = lazy(() => import("./navbar/Navbar"))
const RightSidebar = lazy(() => import("./right_sidebar/RightSidebar"))
const Sidebar = lazy(() => import("./left_sidebar/LeftSidebar"))

export default function MainPage() {
	const viewProfile = localStorage.getItem('view_profile')
	const { activeSidebar } = useActiveSidebar()
	const { postsCount } = usePostsCount()
	const { globalLoading } = useGlobalLoading()
	const { feedLoading } = useFeedLoading()
	const inFriendsTab = activeSidebar === 'friends' || localStorage.getItem('active_sidebar') === 'friends'

	return <>
		<Suspense fallback={<SkeletonHomepage />}>
			<Navbar />
			<div className={`
				${
					postsCount === 0 && viewProfile ? 'h-[100vh]'
					: feedLoading || inFriendsTab ? 'h-[100vh]'
					: 'h-auto'
				}
				f pt-[82px]
			`}>
				<Sidebar />
				<Feed />
				<RightSidebar />
				{globalLoading ? <SkeletonFriendsBar /> : <FriendsBar />}
			</div>
		</Suspense>
	</>
}
