import SidebarNav from "./SidebarNav"
import UserCard from "./UserCard"

export default function Sidebar() {
	return <div className="relative h">
		<div className="fixed h-[92%] w-[17%] bg-white">
			<UserCard />
			<SidebarNav />
		</div>
	</div>
}