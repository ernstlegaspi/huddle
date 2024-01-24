import SidebarNav from "./SidebarNav"
import UserCard from "./UserCard"

export default function Sidebar() {
	return <div className="relative w-[326px] h-16 max-[1280px]:w-[250px]">
		<div className="fixed h-[92%] w-[326px] bg-white max-[1280px]:w-[250px]">
			<UserCard />
			<SidebarNav />
		</div>
	</div>
}