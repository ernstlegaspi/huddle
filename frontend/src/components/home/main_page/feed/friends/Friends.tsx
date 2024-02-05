import toast from "react-hot-toast"
import { useEffect, useState } from "react"

import FriendsTabCard from "./FriendsTabCard"
import useCurrentUser from "../../../../../hooks/useCurrentUser"
import SkeletonFriendsTabCard from "./SkeletonFriendsTabCard"
import { getUserFriends } from "../../../../../api/user/get"

export default function FriendsTab() {
	const [data, setData] = useState<User[]>([])
	const [loading, setLoading] = useState(false)
	const { currentUser } = useCurrentUser()
	
	useEffect(() => {
		(async () => {
			try {
				setLoading(true)

				const { data: res } = await getUserFriends(currentUser.email)
	
				setData(res)
				setLoading(false)
			}
			catch(e) {
				setLoading(false)
				toast.error('Internal server error.')
			}
		})()
	}, [])

	return <div className="w h flex flex-col">
		<div className="h-[11px]"></div>
		<div className="w flex-1 p-3 bg-white rounded-r5 scroll">
			<p className="vio-label text-20 mb-3">Friends</p>
			<>
				{
					!loading && data.length < 1 ? <p className="text-dvio tracking-wider">You do not have any friends. Add other users to interact with.</p>
					: <div className="w grid grid-cols-2 gap-3">
						{
							loading ? <>
								<SkeletonFriendsTabCard />
								<SkeletonFriendsTabCard />
								<SkeletonFriendsTabCard />
								<SkeletonFriendsTabCard />
							</> : data.map(otherUser => <FriendsTabCard key={otherUser._id} user={otherUser} />)
						}
					</div>
				}
			</>
		</div>
		<div className="h-[10px]"></div>
	</div>
}
