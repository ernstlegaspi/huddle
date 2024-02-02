import ProfilePicture from "../../../ProfilePicture"
import VioButton from "../../../VioButton"

export default function OtherUserCard({ otherUser }: { otherUser: User }) {
	return <div className="v-center-bet w py-2 px-2 mb-3">
		<div className="v-center">
			<ProfilePicture picture={otherUser.picture as string} />
			<div className="text-vio ml-2">
				<p>{otherUser.name}</p>
				<p className="text-14">@{otherUser.username}</p>
			</div>
		</div>
		<VioButton label="Add" loading={false} onClick={() => {}} />
	</div>
}
