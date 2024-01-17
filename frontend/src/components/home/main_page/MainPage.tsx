import { lazy, Suspense } from 'react'

const Navbar = lazy(() => import("./navbar/Navbar"))
const Sidebar = lazy(() => import("./sidebar/Sidebar"))

export default function MainPage() {
	return <>
		<Suspense fallback={<p>Load...</p>}>
			<Navbar />
			<div className="f pt-[82px]">
				<Sidebar />
			</div>
			<div className="h-[200vh]"></div>
		</Suspense>
	</>
}
