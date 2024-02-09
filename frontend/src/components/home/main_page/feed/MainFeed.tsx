import { useEffect } from "react"
import { getFriendsPosts } from "../../../../api/post/get"
import useCurrentUser from "../../../../hooks/useCurrentUser"
import useGlobalLoading from "../../../../hooks/useGlobalLoading"

export default function MainFeed() {
	const { currentUser } = useCurrentUser()
	const { globalLoading } = useGlobalLoading()

	useEffect(() => {
		(async () => {
			if(globalLoading) return

			const userFriends = currentUser.friends?.join('-')

			if(!userFriends) return

			await getFriendsPosts(currentUser.email, userFriends as string)

		})()
	}, [globalLoading])

	return <div>
		<p className="vio-label">Main Feed</p>
	</div>
}
