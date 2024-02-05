import { BiDotsHorizontalRounded } from "react-icons/bi"

import ProfilePicture from "../../../../ProfilePicture"
import HoverableIcon from "../../../../HoverableIcon"

	export default function FriendsTabCard({ user }: { user: User }) {
	return <div className="border border-vio/30 rounded-[4px] p-3 pointer transition-all hover:bg-vio/30">
		<div className="v-center-bet w">
			<div className="v-center">
				<ProfilePicture picture={user.picture as string} />
				<div className="ml-3">
					<p className="font-medium text-dark">{user.name}</p>
					<p className="text-14 text-vio">@{user.username}</p>
				</div>
			</div>
			<HoverableIcon mainIcon={BiDotsHorizontalRounded} onClick={() => {}} />
		</div>
	</div>
}
