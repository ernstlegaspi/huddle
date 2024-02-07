import useUserFriends from "../../../../hooks/useUserFriends"
import FriendsRightBar from "./FriendsRightBar"

export default function FriendsBar() {
	const { userFriends } = useUserFriends()
	
	return <div className="relative w-[16%] f justify-end">
		<div className="h bg-white w-[93%] scroll">
			{
				userFriends.length < 1 ? <p className="tracking-wider p-3 text-vio">You do not have any friends. Add other users.</p>
				: userFriends.map(friend => <FriendsRightBar key={friend._id} user={friend} />)
			}
		</div>
	</div>
}
