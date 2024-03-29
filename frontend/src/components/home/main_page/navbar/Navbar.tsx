import { Link } from "react-router-dom"

import SearchBar from "./SearchBar"
import UserNav from "./UserNav"
import useViewProfile from "../../../../hooks/useViewProfile"
import useActiveSidebar from "../../../../hooks/useActiveSidebar"

export default function Navbar() {
	const { toggle } = useViewProfile()
	const { setActiveSidebar } = useActiveSidebar()

	const handleClick = () => {
		localStorage.setItem('view_profile', '')
		localStorage.setItem('active_sidebar', 'feed')
		toggle('')
		setActiveSidebar('feed')
	}

	return <div className="relative w">
		<div className="z-50 px-8 py-10 bg-white fixed w h-[60px] v-center-bet border-b-2 border-vio/30">
			<div className="v-center">
				<Link onClick={handleClick} to="/">
					<h1 className="lemon text-vio font-bold text-40">Huddle</h1>
				</Link>
				<SearchBar />
			</div>
			<UserNav />
		</div>
	</div>
}
