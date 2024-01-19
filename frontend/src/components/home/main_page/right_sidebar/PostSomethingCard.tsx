import useAddPostModal from "../../../../hooks/useAddPostModal"
import ProfilePicture from "../../../ProfilePicture"

export default function PostSomethingCard() {
	const { open } = useAddPostModal()
	
	const handleClick = () => {
		open()
		document.body.style.overflow = 'hidden'
	}

	return <div className="card w">
		<p className="vio-label p-3">Post Something</p>
		<div className="w border-t border-vio/30 f p-3">
			<div className="mt-[3px]">
					<ProfilePicture />
			</div>
			<div onClick={handleClick} className="w h-max p-2 rounded-full text-dvio pointer transition-all hover:bg-vio/30 ml-2">
				<p>What's on your mind?</p>
			</div>
		</div>
	</div>
}