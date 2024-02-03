import ProfilePicture from "../ProfilePicture"

export default function FriendRequestNotificationCard() {
	return <div className="notification-card mb-1">
		<div className="v-center">
			<ProfilePicture width={42} height={42} picture="" />
			<div className="ml-[10px]">
				<p className="font-medium">Ernst Legaspi</p>
				<p className="text-14">Sent a friend request</p>
			</div>
		</div>
		<div>
			<button className="rounded-r5 bg-vio text-white py-1 px-3 transition-all hover:bg-dvio">Confirm</button>
			<button className="rounded-r5 bg-dark text-white py-1 px-3 ml-1 transition-all hover:bg-black">Delete</button>
		</div>
	</div>
}
