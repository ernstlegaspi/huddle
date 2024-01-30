import { useChangePictureModal } from "../../../hooks/useToggleModal"
import BlackInset from "../BlackInset"

export default function ChangePictureModal() {
	const { close, isOpen } = useChangePictureModal()

	if(!isOpen) return null

	const UserButton = ({ label, onClick }: { label: string, onClick: () => void }) => <>
		<div onClick={onClick} className="pointer w py-2 text-center transition-all text-dark hover:bg-vio/30">
			<p>{label}</p>
		</div>
	</>

	return <BlackInset close={close}>
		<div className="card w-[300px]">
			<UserButton label="View Photo" onClick={() => {}} />
			<UserButton label="Upload Photo" onClick={() => {}} />
			<UserButton label="Remove Current Photo" onClick={() => {}} />
			<UserButton label="Cancel" onClick={() => close()} />
		</div>
	</BlackInset>
}
