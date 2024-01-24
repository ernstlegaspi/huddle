import EventsCard from "./EventsCard"
import OtherUserCard from "./OtherUserCard"
import PostSomethingCard from "./PostSomethingCard"

export default function RightSidebar() {
	return <div className="relative w-[14%]">
		<div className="h w-[14%] fixed f flex-col py-3">
			<PostSomethingCard />
			<EventsCard />
			<OtherUserCard />
			<div className="h-[80px]"></div>
		</div>
	</div>
}