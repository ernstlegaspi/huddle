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

const AddPostModal = lazy(() => import("./components/modals/add_post/AddPostModal"))
const ChangeCoverPhotoModal = lazy(() => import("./components/modals/change_picture/ChangeCoverPhotoModal"))
const ChangePictureModal = lazy(() => import("./components/modals/change_picture/ChangePictureModal"))
const EditProfileModal = lazy(() => import("./components/modals/edit_profile/EditProfileModal"))
const SettingsModal = lazy(() => import("./components/modals/settings/SettingsModal"))
const ViewCoverPhotoModal = lazy(() => import("./components/modals/ViewCoverPhotoModal"))
const ViewProfilePictureModal = lazy(() => import("./components/modals/ViewProfilePictureModal"))

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
				<AddPostModal />
				<ChangeCoverPhotoModal />
				<ChangePictureModal />
				<EditProfileModal />
				<SettingsModal />
				<ViewCoverPhotoModal />
				<ViewProfilePictureModal />
				<Toaster />
				<Routes>
					<Route path="/" element={<HomePage />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	</div>
}
