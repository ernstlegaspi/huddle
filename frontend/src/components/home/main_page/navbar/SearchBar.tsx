import { IoSearchSharp } from "react-icons/io5"

export default function SearchBar() {
	return <div className="ml-[100px] border border-dvio/30 v-center w-[300px] rounded-full bg-gl text-vio pl-3">
		<input type="text" className="p-2 bg-transparent outline-none flex-1" placeholder="Search..." />
		<div className="pointer p-2">
			<IoSearchSharp size={20} />
		</div>
	</div>
}
