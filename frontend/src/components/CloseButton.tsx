import { IoClose } from "react-icons/io5"
import HoverableIcon from "./HoverableIcon"

export default function CloseButton({ disabled, handleClose }: { disabled?: boolean, handleClose: () => void }) {
	return <HoverableIcon disabled={disabled} mainIcon={IoClose} onClick={handleClose} />
}
