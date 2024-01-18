import { BsCalendar3Event } from "react-icons/bs"

import ProfilePicture from "../../../ProfilePicture"

export default function Profile() {
	return <div className="w h py-6 relative f flex-col">
		<div className="w bg-vio/50 rounded-r5 h-[300px]">

		</div>
		<div className="relative z-20 w h-center mt-[-85px]">
			<ProfilePicture width={150} height={150} />
		</div>
		<div className="relative z-10 w h-center mt-[-160px]">
			<div className="relative z-10 h-center rounded-full bg-gl h-[170px] w-[170px]"></div>
		</div>
		<div className="relative z-0 w h-[500px] bg-white rounded-r5 mt-[-63px]">
			<div className="w f justify-between p-3 text-dark">
				<div>
					<p className="font-bold text-20">Ernst Legaspi</p>
					<p className="text-dvio">@ErnstLegaspi</p>
				</div>
				<div className="f font-medium">
					<BsCalendar3Event className="mt-[4px] mr-2" />
					<p>Joined November 2023</p>
				</div>
			</div>
		</div>
	</div>
}