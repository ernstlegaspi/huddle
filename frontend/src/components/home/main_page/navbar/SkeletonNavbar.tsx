import { Skeleton } from "../../../ui/skeleton"

export default function SkeletonNavbar() {
	const SkeletonSearchBar = () => <Skeleton className="ml-[100px] rounded-full h-[42px] w-[300px] bg-vio/30 border border-dvio/30" />

	const SkeletonUserNav = () => <div className="v-center">
		<Skeleton className="rounded-full bg-vio/30 p-[13px]" />
		<Skeleton className="rounded-full bg-vio/30 p-[13px] mx-3" />
		<Skeleton className="rounded-full bg-vio/30 p-[13px] mr-2" />
		<p className="lemon hover:text-dvio text-vio ml-3 font-medium pointer tracking-wider">Logout</p>
	</div>
	
	return <div className="relative w">
		<div className="z-50 px-8 py-10 bg-white fixed w h-[60px] v-center-bet border-b-2 border-vio/30">
			<div className="v-center">
				<h1 className="lemon text-vio font-bold text-40">Huddle</h1>
				<SkeletonSearchBar />
			</div>
			<SkeletonUserNav />
		</div>
	</div>
}
