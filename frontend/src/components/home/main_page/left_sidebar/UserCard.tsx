import { useDispatch, useSelector } from "react-redux"

import ProfilePicture from "../../../ProfilePicture"
import { setViewProfile } from "../../../../slices/ui/uiSlice"

export default function UserCard() {
	const user: AuthUser = useSelector((state: any) => state.auth.userInfo)
	const dispatch = useDispatch()

	const handleClick = () => {
		dispatch(setViewProfile(true))
	}

	return <div className="w-[90%] mx-auto mt-4 text-dark">
		<div onClick={handleClick} className="v-center pointer border border-vio/30 rounded-r5 px-3 py-2 bg-gl transition-all hover:bg-vio/30">
			<div className="pt-[5px]">
				<ProfilePicture />
			</div>
			<div className="ml-3">
				<p className="font-bold">{user?.name}</p>
				<p className="text-14 text-vio">{user?.username}</p>
			</div>
		</div>
	</div>
}
