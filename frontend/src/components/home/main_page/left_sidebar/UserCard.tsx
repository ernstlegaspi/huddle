import ProfilePicture from "../../../ProfilePicture"
import { getPersistedUser } from "../../../../lib/utils"
import useViewProfile from "../../../../hooks/useViewProfile"
import useNameUsername from "../../../../hooks/useNameAndUsername"
import useCurrentPhoto from "../../../../hooks/useCurrentPhoto"

export default function UserCard() {
	const user: AuthUser = getPersistedUser()
	const { nameUsername } = useNameUsername()
	const { currentPhoto } = useCurrentPhoto()
	const { toggle } = useViewProfile()

	const handleClick = async () => {
		localStorage.setItem('view_profile', "true")
		toggle('true')
	}

	return <div className="w-[90%] mx-auto mt-4 text-dark">
		<div onClick={handleClick} className="v-center pointer border border-vio/30 rounded-r5 px-3 py-2 bg-gl transition-all hover:bg-vio/30">
			<div className="pt-[5px]">
				{user.picture || currentPhoto ? <div className="w-[35px] h-[35px]">
					<ProfilePicture picture={currentPhoto ? currentPhoto : user?.picture as string} />
				</div> : <ProfilePicture picture={user?.picture as string} />}
			</div>
			<div className="ml-3">
				<p className="font-bold">{nameUsername.name ? nameUsername.name : user?.name}</p>
				<p className="text-14 text-vio">@{nameUsername.username ? nameUsername.username : user?.username}</p>
			</div>
		</div>
	</div>
}
