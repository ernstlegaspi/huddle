import { lazy, Suspense } from 'react'
import SkeletonHomepage from './SkeletonHomepage'
import { getUser } from '../../lib/utils'

const Auth = lazy(() => import("./auth_page/Auth"))
const MainPage = lazy(() => import("./main_page/MainPage"))

export default function HomePage() {
	const user: AuthUser = getUser()

	return <>
		<Suspense fallback={user ? <SkeletonHomepage /> : <div className="w h-[100vh] bg-vio"></div>}>
			{user ? <MainPage /> : <Auth />}
		</Suspense>
	</>
}
