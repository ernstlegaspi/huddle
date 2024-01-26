import axios from 'axios'
import { lazy, Suspense, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import AddPostModal from './components/modals/add_post/AddPostModal'
import EditProfileModal from './components/modals/edit_profile/EditProfileModal'
import SkeletonHomepage from './components/home/SkeletonHomepage'
import SettingsModal from './components/modals/settings/SettingsModal'
import { clearLocalStorage, getUser } from './lib/utils'
import { getUserApi, signOut } from './api/api'

const HomePage = lazy(() => import("./components/home/HomePage"))

axios.defaults.withCredentials = true

export default function App() {
	const user = getUser()

	useEffect(() => {
		if(user) {
			(async () => {
				try {
					await getUserApi(user?.email)
				}
				catch(e) {
					await signOut()
					toast.error('User is invalid. Logging you out.')
					clearLocalStorage()
					window.location.reload()
				}
			})()
		}
	}, [user])

	return <div className={`
		${user ? 'bg-gl' : 'bg-vio'}
		h-auto w
	`}>
		<AddPostModal />
		<EditProfileModal />
		<SettingsModal />
		<BrowserRouter>
			<Suspense fallback={user ? <SkeletonHomepage /> : <div className="w h-[100vh] bg-vio"></div>}>
				<Toaster />
				<Routes>
					<Route path="/" element={<HomePage />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	</div>
}
