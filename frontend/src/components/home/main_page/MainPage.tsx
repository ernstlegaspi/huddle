import { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'

const Feed = lazy(() => import("./feed/Feed"))
const FriendsBar = lazy(() => import("./friends_bar/FriendsBar"))
const Navbar = lazy(() => import("./navbar/Navbar"))
const RightSidebar = lazy(() => import("./right_sidebar/RightSidebar"))
const Sidebar = lazy(() => import("./left_sidebar/Sidebar"))

export default function MainPage() {
	const viewProfile = useSelector((state: any) => state.ui.viewProfile)

	return <>
		<Suspense fallback={<p>Load...</p>}>
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
