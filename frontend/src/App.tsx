import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"

const HomePage = lazy(() => import("./components/home/HomePage"))

export default function App() {
	return <div className={`h-[100vh] w bg-vio`}>
		<BrowserRouter>
			<Suspense fallback={<p>Loading</p>}>
				<Routes>
					<Route path="/" element={<HomePage />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	</div>
}