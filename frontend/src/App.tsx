import axios from 'axios'
import { lazy, Suspense, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import SkeletonHomepage from './components/home/SkeletonHomepage'
import usePostsCount from './hooks/usePostsCount'
import { clearLocalStorage, getUser } from './lib/utils'
import { getUserApi, signOut } from './api/api'

const AddPostModal = lazy(() => import("./components/modals/add_post/AddPostModal"))
const EditProfileModal = lazy(() => import("./components/modals/edit_profile/EditProfileModal"))
const ChangePictureModal = lazy(() => import("./components/modals/change_picture/ChangePictureModal"))
const SettingsModal = lazy(() => import("./components/modals/settings/SettingsModal"))

const HomePage = lazy(() => import("./components/home/HomePage"))

axios.defaults.withCredentials = true

export default function App() {
	const { postsCount } = usePostsCount()
	const user = getUser()

	useEffect(() => {
		if(user) {
			(async () => {
				try {
					const { data } = await getUserApi(user?.email)

					localStorage.setItem('huddle_user', JSON.stringify({
						email: data.email,
						name: data.name,
						username: data.username,
						picture: data.picture
					}))
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
		${postsCount === 0 ? 'h-[100vh]' : 'h-auto'}
		w
	`}>
		<BrowserRouter>
			<Suspense fallback={user ? <SkeletonHomepage /> : <div className="w h-[100vh] bg-vio"></div>}>
				<AddPostModal />
				<ChangePictureModal />
				<EditProfileModal />
				<SettingsModal />
				<Toaster />
				<Routes>
					<Route path="/" element={<HomePage />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	</div>
}
