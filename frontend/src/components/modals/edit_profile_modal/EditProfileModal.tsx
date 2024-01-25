import { ChangeEvent, useState } from "react"

import CloseButton from "../../CloseButton"
import Input from "../../Input"
import BlackInset from "../BlackInset"
import { useEditProfileModal } from "../../../hooks/useToggleModal"

export default function EditProfileModal() {
	const [data, setData] = useState({ name: '', username: '' })
	const { close, isOpen } = useEditProfileModal()

	if(!isOpen) return null

	const handleClose = () => {
		close()
		document.body.style.overflow = "auto"
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value })
	}

	return <BlackInset close={close}>
		<div className="card h-auto w-[400px]">
			<div className="v-center-bet w p-2 pr-4 border-b border-vio/30">
				<CloseButton handleClose={handleClose} />
				<p className="vio-label text-20">Edit Profile</p>
				<button className="rounded-full text-white py-1 px-4 bg-vio transition-all hover:bg-dvio">Save</button>
			</div>
			<div className="px-4 mt-2 py-4">
				<Input
					label="Name"
					name="name"
					onChange={handleChange}
					placeholder="Change name..."
					type="text"
					value={data.name}
				/>

				<div className="h-[25px]"></div>

				<Input
					label="Username"
					name="username"
					onChange={handleChange}
					placeholder="Change username..."
					type="text"
					value={data.username}
				/>
			</div>
		</div>
	</BlackInset>
}
