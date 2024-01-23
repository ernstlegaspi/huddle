import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"

import SearchBar from "./SearchBar"
import UserNav from "./UserNav"
import { setActiveSidebar, setViewProfile } from "../../../../slices/ui/uiSlice"

export default function Navbar() {
	const dispatch = useDispatch()

	const handleClick = () => {
		dispatch(setViewProfile(false))
		dispatch(setActiveSidebar('feed'))
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