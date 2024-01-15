import SearchBar from "./SearchBar"
import UserNav from "./UserNav"

export default function Navbar() {
	return <div className="relative w">
		<div className="px-8 py-10 bg-white fixed w h-[60px] v-center-bet border-b-2 border-vio/15">
			<div className="v-center">
				<h1 className="lemon text-vio font-bold text-40">Huddle</h1>
				<SearchBar />
			</div>
			<UserNav />
		</div>
	</div>
}