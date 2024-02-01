import ProfilePicture from "../../../ProfilePicture"
import useViewProfile from "../../../../hooks/useViewProfile"
import useNameUsername from "../../../../hooks/useNameAndUsername"
import useCurrentUser from "../../../../hooks/useCurrentUser"
import useGlobalLoading from "../../../../hooks/useGlobalLoading"
import { Skeleton } from "../../../ui/skeleton"

export default function UserCard() {
	const { currentUser: user } = useCurrentUser()
	const { nameUsername } = useNameUsername()
	const { toggle } = useViewProfile()
	const { globalLoading } = useGlobalLoading()

	const handleClick = async () => {
		localStorage.setItem('view_profile', "true")
		toggle('true')
	}

	return <div className="w-[90%] mx-auto mt-4 text-dark">
		<div onClick={handleClick} className="w v-center pointer border border-vio/30 rounded-r5 px-3 py-2 bg-gl transition-all hover:bg-vio/30">
			<div className="pt-[5px]">
				{
					globalLoading ? <Skeleton className="bg-vio w-[35px] h-[35px] rounded-full" />
					: user.picture ? <div className="w-[35px] h-[35px]">
						<ProfilePicture picture={user?.picture as string} />
					</div> : <ProfilePicture picture={user?.picture as string} />
				}
			</div>
			<div className="ml-3">
				{
					globalLoading ? <>
						<Skeleton className="rounded-full py-[5px] bg-vio w-[75px]" />
						<Skeleton className="rounded-full py-[5px] bg-vio w-[50px] mt-1" />
					</>
					: <>
						<p className="font-bold break-all">{nameUsername.name ? nameUsername.name : user?.name}</p>
						<p className="text-14 text-vio break-all">@{nameUsername.username ? nameUsername.username : user?.username}</p>
					</>
				}
			</div>
		</div>
	</div>
}
