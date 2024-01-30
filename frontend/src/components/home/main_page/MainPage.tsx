import { lazy, Suspense } from 'react'
import SkeletonHomepage from '../SkeletonHomepage'
import useViewProfile from '../../../hooks/useViewProfile'
import usePostsCount from '../../../hooks/usePostsCount'

const Feed = lazy(() => import("./feed/Feed"))
const FriendsBar = lazy(() => import("./friends_bar/FriendsBar"))
const Navbar = lazy(() => import("./navbar/Navbar"))
const RightSidebar = lazy(() => import("./right_sidebar/RightSidebar"))
const Sidebar = lazy(() => import("./left_sidebar/LeftSidebar"))

export default function MainPage() {
	const viewProfile = localStorage.getItem('view_profile')
	const { postsCount } = usePostsCount()
	const { isClicked } = useViewProfile()

	return <>
		<Suspense fallback={<SkeletonHomepage />}>
			<Navbar />
			<div className={`${postsCount === 0 ? 'h-[100vh]' : isClicked || viewProfile ? 'h-auto' : 'h-[100vh]'} f pt-[82px]`}>
				<Sidebar />
				<Feed />
				<RightSidebar />
				<FriendsBar />
			</div>
		</Suspense>
	</>
}
