import { lazy, Suspense } from 'react'

const Navbar = lazy(() => import("./navbar/Navbar"))

export default function MainPage() {
	return <>
		<Suspense fallback={<p>Load...</p>}>
			<Navbar />
			<div className="h-[200vh]"></div>
		</Suspense>
	</>
}