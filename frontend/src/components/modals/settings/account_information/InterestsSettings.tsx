import toast from "react-hot-toast"
import { useState } from "react"

import CloseButton from "../../../CloseButton"
import useCurrentUser from "../../../../hooks/useCurrentUser"
import VioButton from "../../../VioButton"
import { axiosError } from "../../../../lib/utils"
import { interestsArr } from "../../../../constants"
import { updateInterests } from "../../../../api/user/put"

export default function InterestsSettings({ setSettingsContent }: { setSettingsContent: React.Dispatch<React.SetStateAction<string>> }) {
	const { currentUser, setCurrentUser } = useCurrentUser()
	const [loading, setLoading] = useState(false)
	const [interestsArray, setInterests] = useState<string[]>(currentUser.interests)
	const [isClicked, setIsClicked] = useState(false)

	const Interest = ({ text }: { text: string }) => {
		const handleClick = () => {
			if(loading) return

			const existingInterests = [...interestsArray]

			if(existingInterests.includes(text)) {
				existingInterests.splice(existingInterests.indexOf(text), 1)
				setInterests(existingInterests)
				setIsClicked(true)

				return
			}

			existingInterests.push(text)
			setInterests(existingInterests)
		}

		return <div onMouseLeave={() => {
			setIsClicked(false)
		}} onClick={handleClick} className={`
			${loading && interestsArray.includes(text) ? 'bg-vio/30 text-white border-transparent' : loading ? 'bg-gray-100 border-gray-100' : 'pointer border-vio'}
			${loading ? '' : interestsArray.includes(text) ? 'bg-vio text-white shadow shadow-vio' : 'bg-white text-vio'}
			${loading ? '' : isClicked ? '' : 'hover:text-white hover:bg-vio'}
			rounded-full border py-2 px-4 transition-all w-max
		`}>
			{text}
		</div>
	}

	const handleClose = () => {
		if(loading) return
		setSettingsContent('')
	}
	
	const handleClick = async () => {
		try {
			if(interestsArray.length < 5) {
				toast.error('Interests should be at least 5.')
				return
			}

			if(interestsArray.sort().join('').trim() === currentUser.interests.sort().join('').trim()) {
				toast.error('There are no changes in your interests.')
				return
			}

			setLoading(true)
			
			await updateInterests({ email: currentUser.email, interests: interestsArray })
			
			setCurrentUser({ ...currentUser, interests: interestsArray })
			setLoading(false)
			setSettingsContent('')
		}
		catch(e) {
			setLoading(false)
			toast.error(axiosError(e, "Can not update interests. Try again later."))
		}
	}

	return <div className="s p-3">
		<div className="v-center">
			<CloseButton disabled={loading} handleClose={handleClose} />
			<p className="vio-label text-20 ml-1">Change Interests</p>
		</div>
		<p className="text-vio tracking-wider mt-1">Pick at least 5 interests</p>
		<div className="flex flex-wrap gap-2 my-3">
			{interestsArr.map((interest, idx) => <Interest key={idx} text={interest} />)}
		</div>
		<div className="h-end">
			<VioButton
				label={loading ? "Updating..." : "Update"}
				loading={loading || interestsArray.length < 5 || interestsArray.sort().join('').trim() === currentUser.interests.sort().join('').trim()}
				onClick={handleClick}
			/>
		</div>
	</div>
}
