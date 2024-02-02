import toast from "react-hot-toast"
import { useEffect, useState } from "react"

import CircleLoader from "../../../CircleLoader"
import useCurrentUser from "../../../../hooks/useCurrentUser"
import OtherUserCard from "./OtherUserCard"
import { getUserWithSameInterests } from "../../../../api/api"
import { axiosError } from "../../../../lib/utils"

export default function AddFriendTab() {
	const [loading, setLoading] = useState(false)
	const [otherUsers, setOtherUsers] = useState<User[]>([])
	const { currentUser } = useCurrentUser()
	
	useEffect(() => {
		(async () => {
			try {
				setLoading(true)

				const { data } = await getUserWithSameInterests(currentUser.email, currentUser.interests.join("-"))

				setOtherUsers(data)
				setLoading(false)
			}
			catch(e) {
				setLoading(false)
				toast.error(axiosError(e, "Can not fetch other users."))
			}
		})()
	}, [currentUser])
	
	return <div className="card flex-1 w scroll">
		<p className="vio-label p-3 border-b border-vio/30 mb-3">Add Friend</p>
		<>
			{
				loading ? <CircleLoader />
				: otherUsers.length < 1 ? null
				: otherUsers.map(otherUser => <OtherUserCard key={otherUser.name} otherUser={otherUser} />)
			}
		</>
	</div>
}
