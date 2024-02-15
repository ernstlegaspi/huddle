import { lazy, Suspense } from 'react'
import SkeletonHomepage from '../SkeletonHomepage'
import useViewProfile from '../../../hooks/useViewProfile'
import usePostsCount from '../../../hooks/usePostsCount'
import useGlobalLoading from '../../../hooks/useGlobalLoading'
import SkeletonFriendsBar from './friends_bar/SkeletonFriendsBar'
import useFeedPosts from '../../../hooks/useFeedPosts'
import useFeedLoading from '../../../hooks/useFeedLoading'

const Feed = lazy(() => import("./feed/Feed"))
const FriendsBar = lazy(() => import("./friends_bar/FriendsBar"))
const Navbar = lazy(() => import("./navbar/Navbar"))
const RightSidebar = lazy(() => import("./right_sidebar/RightSidebar"))
const Sidebar = lazy(() => import("./left_sidebar/LeftSidebar"))

export default function MainPage() {
	const viewProfile = localStorage.getItem('view_profile')
	const { postsCount } = usePostsCount()
	const { isClicked } = useViewProfile()
	const { feedPosts } = useFeedPosts()
	const { globalLoading } = useGlobalLoading()
	const { feedLoading } = useFeedLoading()

	return <>
		<Suspense fallback={<SkeletonHomepage />}>
			<Navbar />
			<div className={`
				${feedLoading ? 'bg-green-200 h-[100vh]' : ''}
				f pt-[82px]
			`}>
			{/* <div className={`
				${
					postsCount === 0 && viewProfile ? 'h-[100vh] bg-red-500'
					: isClicked || viewProfile || feedPosts > 2 ? 'h-auto bg-green-500'
					: 'h-[100vh] bg-blue-300'
				}
				f pt-[82px]
			`}> */}
				<Sidebar />
				<Feed />
				<RightSidebar />
				{globalLoading ? <SkeletonFriendsBar /> : <FriendsBar />}
			</div>
		</Suspense>
	</>
}
