import EventsCard from "./EventsCard"
import AddFriendTab from "./AddFriendTab"
import PostSomethingCard from "./PostSomethingCard"
import useGlobalLoading from "../../../../hooks/useGlobalLoading"
import SkeletonAddFriend from "./SkeletonAddFriendTab"

export default function RightSidebar() {
	const { globalLoading } = useGlobalLoading()

	return <div className="relative w-[17%]">
		<div className="h w-[17%] fixed f flex-col py-3">
			<PostSomethingCard />
			<EventsCard />
			{globalLoading ? <SkeletonAddFriend /> : <AddFriendTab />}
			<div className="h-[80px]"></div>
		</div>
	</div>
}