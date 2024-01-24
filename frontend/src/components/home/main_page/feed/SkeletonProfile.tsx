import SkeletonPostCard from "../../../SkeletonPostCard"
import { Skeleton } from "../../../ui/skeleton"

export default function SkeletonProfile() {
	return <div className="w h py-6 relative">
		<Skeleton className="w bg-vio/30 rounded-r5 h-[300px]" />
		<div className="mt-[75px]"></div>
		<Skeleton className="bg-vio/30 rounded-r5 mt-[-63px] h-[78px]" />
		<div className="mt-3"></div>
		<div className="grid grid-cols-2 gap-3">
			<SkeletonPostCard />
			<SkeletonPostCard />
			<SkeletonPostCard />
			<SkeletonPostCard />
		</div>
	</div>
}
