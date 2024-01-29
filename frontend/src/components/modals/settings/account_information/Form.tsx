import { ChangeEvent } from "react"
import { IoIosArrowBack } from "react-icons/io"

import HoverableIcon from "../../../HoverableIcon"
import Input from "../../../Input"
import VioButton from "../../../VioButton"

type Props = {
	handleSubmit: () => void
	inputLabel: string
	label: string
	loading: boolean
	name: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	placeholder: string
	setSettingsContent: React.Dispatch<React.SetStateAction<string>>
	type?: string
	value: string
}

export default function AccountForm({
	handleSubmit,
	inputLabel,
	label,
	loading,
	name,
	onChange,
	placeholder,
	setSettingsContent,
	type = "text",
	value
}: Props) {
	const handleClick = () => {
		if(loading) return

		setSettingsContent('')
	}
	
	return <div className="s p-3">
		<div className="mb-5 v-center">
			<HoverableIcon disabled={loading} mainIcon={IoIosArrowBack} onClick={handleClick} />
			<p className="vio-label text-20 ml-1">{label}</p>
		</div>
		<Input
			disabled={loading}
			type={type}
			value={value}
			onChange={onChange}
			name={name}
			placeholder={placeholder}
			label={inputLabel}
		/>
		<div className="h-end mt-3">
			<VioButton label={loading ? "Updating..." : "Update"} loading={loading} onClick={handleSubmit} />
		</div>
	</div>
}
