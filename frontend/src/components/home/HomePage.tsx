import { lazy, Suspense } from 'react'

const Auth = lazy(() => import("./auth_page/Auth"))

export default function HomePage() {
	return <Auth />
}