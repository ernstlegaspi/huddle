type Props = {
	label: string
	loading: boolean
	onClick: () => void
}

export default function VioButton({ label, loading, onClick }: Props) {
	return <button disabled={loading} onClick={onClick} className={`
		${loading ? 'bg-vio/30' : 'bg-vio hover:bg-dvio'}
		transition-all text-white rounded-r5 py-2 px-4
	`}>{label}</button>
}
