import { Skeleton } from "../../../../ui/skeleton"

export default function SkeletonFriendsTab() {
	return <div className="w h flex flex-col">
	<div className="h-[11px]"></div>
	<div className="w flex-1 p-3 bg-white rounded-r5 scroll">
		<Skeleton className="h-[20px] w-[50px] rounded-r5 bg-vio mb-3" />
		<div className="w grid grid-cols-2 gap-3">
			{/* <FriendsTabCard /> */}
		</div>
	</div>
	<div className="h-[10px]"></div>
</div>
}
