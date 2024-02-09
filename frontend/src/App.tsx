import axios from 'axios'
import { lazy, Suspense, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { io } from 'socket.io-client'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import SkeletonHomepage from './components/home/SkeletonHomepage'
import usePostsCount from './hooks/usePostsCount'
import useCurrentUser from './hooks/useCurrentUser'
import useGlobalLoading from './hooks/useGlobalLoading'
import Modal from './components/modals/Modal'
import useUserFriends from './hooks/useUserFriends'
import { clearLocalStorage, getPersistedUser, setPersistedUser } from './lib/utils'
import { signOut } from './api/auth/auth'
import { getUserApi, getUserFriends } from './api/user/get'
import { serverURL } from './constants'

const HomePage = lazy(() => import("./components/home/HomePage"))

axios.defaults.withCredentials = true

export const socket = io(serverURL)

export default function App() {
	const { setGlobalLoading } = useGlobalLoading()
	const { setCurrentUser } = useCurrentUser()
	const { postsCount } = usePostsCount()
	const { setUserFriends } = useUserFriends()
	const user = getPersistedUser()

	useEffect(() => {
		if(user) {
			(async () => {
				try {
					setGlobalLoading(true)

					const [userData, userFriends] = await Promise.all([
						getUserApi(user?.email),
						getUserFriends(user?.email)
					])
					
					socket.emit('join-user-room', userData.data._id)

					setCurrentUser(userData.data)

					setPersistedUser({
						email: userData.data.email,
						name: userData.data.name,
						username: userData.data.username
					})

					setUserFriends(userFriends.data)
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
