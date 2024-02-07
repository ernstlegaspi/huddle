import { Skeleton } from "../../../ui/skeleton"

export default function SkeletonFriendsBar() {
	const FriendsSkeleton = () => <div className="w v-center p-3">
		<Skeleton className="rounded-full p-3 bg-vio mr-3" />
		<Skeleton className="rounded-r5 w-[100px] py-[6px] bg-vio" />
	</div>

	return <div className="relative w-[16%] f justify-end">
		<div className="h bg-white w-[93%] scroll">
			<FriendsSkeleton />
			<FriendsSkeleton />
			<FriendsSkeleton />
			<FriendsSkeleton />
			<FriendsSkeleton />
			<FriendsSkeleton />
			<FriendsSkeleton />
			<FriendsSkeleton />
			<FriendsSkeleton />
			<FriendsSkeleton />
			<FriendsSkeleton />
			<FriendsSkeleton />
			<FriendsSkeleton />
			<FriendsSkeleton />
			<FriendsSkeleton />
			<FriendsSkeleton />
			<FriendsSkeleton />
		</div>
	</div>
}
