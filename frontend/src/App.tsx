import axios from 'axios'
import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AddPostModal from './components/modals/AddPostModal'

const HomePage = lazy(() => import("./components/home/HomePage"))

axios.defaults.withCredentials = true

export default function App() {
	const userInfo = useSelector((state: any) => state?.auth.userInfo)
	const isLoggedIn = Object.keys(userInfo).length > 0

	return <div className={`
		${isLoggedIn ? 'bg-gl' : 'bg-vio'}
		h-auto w
	`}>
		<AddPostModal />
		<BrowserRouter>
			<Suspense fallback={<p>Loading</p>}>
				<Toaster />
				<Routes>
					<Route path="/" element={<HomePage />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	</div>
}
