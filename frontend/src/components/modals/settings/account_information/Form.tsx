import { ChangeEvent } from "react"
import { IoIosArrowBack } from "react-icons/io"

import HoverableIcon from "../../../HoverableIcon"
import Input from "../../../Input"

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
		<div className="h-end">
			<button onClick={handleSubmit} disabled={loading || !value} className={`
				${loading || !value ? 'bg-vio/30' : 'bg-vio hover:bg-dvio'}
				transition-all text-white rounded-r5 py-2 px-4 mt-3
			`}>{loading ? "Loading..." : "Update"}</button>
		</div>
	</div>
}
