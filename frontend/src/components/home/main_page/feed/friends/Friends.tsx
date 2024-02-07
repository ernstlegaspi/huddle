import FriendsTabCard from "./FriendsTabCard"
import SkeletonFriendsTabCard from "./SkeletonFriendsTabCard"
import useUserFriends from "../../../../../hooks/useUserFriends"
import useGlobalLoading from "../../../../../hooks/useGlobalLoading"

export default function FriendsTab() {
	const { userFriends } = useUserFriends()
	const { globalLoading } = useGlobalLoading()

	return <div className="w h flex flex-col">
		<div className="h-[11px]"></div>
		<div className="w flex-1 p-3 bg-white rounded-r5 scroll">
			<p className="vio-label text-20 mb-3">Friends</p>
			<>
				{
					!globalLoading && userFriends.length < 1 ? <p className="text-dvio tracking-wider">You do not have any friends. Add other users to interact with.</p>
					: <div className="w grid grid-cols-2 gap-3">
						{
							globalLoading ? <>
								<SkeletonFriendsTabCard />
								<SkeletonFriendsTabCard />
								<SkeletonFriendsTabCard />
								<SkeletonFriendsTabCard />
							</> : userFriends.map(otherUser => <FriendsTabCard key={otherUser._id} user={otherUser} />)
						}
					</div>
				}
			</>
		</div>
		<div className="h-[10px]"></div>
	</div>
}
