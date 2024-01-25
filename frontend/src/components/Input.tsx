import { ChangeEvent, useState } from 'react'

type Props = {
	disabled: boolean
	label: string
	name: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	placeholder: string
	type: string
	value: string
}

export default function Input({ disabled, label, name, onChange, placeholder, type, value }: Props) {
	const [focused, setFocused] = useState(false)

	return <div className={`
			${focused ? 'shadow-sm shadow-vio/60 border-vio' : 'border-vio/30'}
			border rounded-r5 relative px-2 py-2
		`}>
		<p className={`
			${focused ? 'font-medium text-dvio' : 'text-vio'}
			absolute bg-white px-2 h-max w-max mt-[-21px] rounded-full text-14
		`}>
			{label}
		</p>
		<input
			autoComplete='off'
			className="outline-none py-1 w-full text-dark"
			disabled={disabled}
			name={name}
			onChange={onChange}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			placeholder={placeholder}
			type={type}
			value={value}
		/>
	</div>
}
