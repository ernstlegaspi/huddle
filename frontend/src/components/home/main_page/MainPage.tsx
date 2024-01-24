import { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import SkeletonHomepage from '../SkeletonHomepage'

const Feed = lazy(() => import("./feed/Feed"))
const FriendsBar = lazy(() => import("./friends_bar/FriendsBar"))
const Navbar = lazy(() => import("./navbar/Navbar"))
const RightSidebar = lazy(() => import("./right_sidebar/RightSidebar"))
const Sidebar = lazy(() => import("./left_sidebar/LeftSidebar"))

export default function MainPage() {
	const viewProfile = useSelector((state: any) => state.ui.viewProfile)

	return <>
		<Suspense fallback={<SkeletonHomepage />}>
			<Navbar />
			<div className={`${viewProfile ? 'h-auto' : 'h-[100vh]'} f pt-[82px]`}>
				<Sidebar />
				<Feed />
				<RightSidebar />
				<FriendsBar />
			</div>
		</Suspense>
	</>
}
