import ProfilePicture from "../../../ProfilePicture"

export default function FriendsRightBar({ user }: { user: User }) {
	return <div className="w p-3 v-center-bet pointer transition-all hover:bg-vio/30">
		<div className="v-center">
			<ProfilePicture picture={user.picture as string} />
			<p className="ml-3 text-dvio">{user.name}</p>
		</div>
		<div className="rounded-full p-1 bg-green-300"></div>
	</div>
}
