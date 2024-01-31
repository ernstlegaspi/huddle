type Props = {
	label: string
	loading: boolean
	onClick: () => void
}

export default function UserButton({ label, loading, onClick }: Props) {
	return <div onClick={() => {
		if(loading) return

		onClick()
	}} className={`
	${loading ? 'text-dark/50' : 'pointer hover:bg-vio/30 text-dark'}
		w py-2 text-center transition-all
	`}>
		<p>{loading ? "Updating..." : label}</p>
	</div>
}
