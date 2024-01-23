import { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'

const Auth = lazy(() => import("./auth_page/Auth"))
const MainPage = lazy(() => import("./main_page/MainPage"))

export default function HomePage() {
	const user = useSelector((state: any) => state.auth.userInfo)
	const isLoggedIn = Object.keys(user).length > 0

	return <>
		<Suspense fallback={<p>Ludeng...</p>}>
			{isLoggedIn ? <MainPage /> : <Auth />}
		</Suspense>
	</>
}
