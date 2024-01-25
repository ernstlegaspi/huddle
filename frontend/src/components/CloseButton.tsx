import { IoClose } from "react-icons/io5"
import HoverableIcon from "./HoverableIcon"

export default function CloseButton({ handleClose }: { handleClose: () => void }) {
	return <HoverableIcon mainIcon={IoClose} onClick={handleClose} />
}
