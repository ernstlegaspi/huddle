import axios from 'axios'
import { lazy, Suspense, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import SkeletonHomepage from './components/home/SkeletonHomepage'
import usePostsCount from './hooks/usePostsCount'
import { clearLocalStorage, getPersistedUser, setPersistedUser } from './lib/utils'
import { getUserApi, signOut } from './api/api'
import useCurrentUser from './hooks/useCurrentUser'
import useGlobalLoading from './hooks/useGlobalLoading'
import Modal from './components/modals/Modal'

const HomePage = lazy(() => import("./components/home/HomePage"))

axios.defaults.withCredentials = true

export default function App() {
	const { setGlobalLoading } = useGlobalLoading()
	const { setCurrentUser } = useCurrentUser()
	const { postsCount } = usePostsCount()
	const user = getPersistedUser()

	useEffect(() => {
		if(user) {
			(async () => {
				try {
					setGlobalLoading(true)

					const { data } = await getUserApi(user?.email)

					setCurrentUser(data)

					setPersistedUser({
						email: data.email,
						name: data.name,
						username: data.username
					})
					setGlobalLoading(false)
				}
				catch(e) {
					setGlobalLoading(false)

					await signOut()

					toast.error('User is invalid. Logging you out.')
					clearLocalStorage()
					window.location.reload()
				}
			})()
		}
	}, [])

	return <div className={`
		${user ? 'bg-gl' : 'bg-vio'}
		${postsCount === 0 ? 'h-[100vh]' : 'h-auto'}
		w
	`}>
		<BrowserRouter>
			<Suspense fallback={user ? <SkeletonHomepage /> : <div className="w h-[100vh] bg-vio"></div>}>
				<Modal />
				<Toaster />
				<Routes>
					<Route path="/" element={<HomePage />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	</div>
}
