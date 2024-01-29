import toast from "react-hot-toast"
import { Dispatch, ChangeEvent, SetStateAction, useState } from "react"
import { IoIosArrowBack } from "react-icons/io"

import useCurrentUser from "../../../../../hooks/useCurrentUser"
import HoverableIcon from "../../../../HoverableIcon"
import CircleLoader from "../../../../CircleLoader"
import { axiosError, isValidPassword } from "../../../../../lib/utils"
import { passwordConfirmation } from "../../../../../api/api"
import VioButton from "../../../../VioButton"

type Props = {
	setCanChangePassword: Dispatch<SetStateAction<boolean>>
	setSettingsContent: Dispatch<SetStateAction<string>>
}

export default function PasswordConfirmation({ setCanChangePassword, setSettingsContent }: Props) {
	const [loading, setLoading] = useState(false)
	const [password, setPassword] = useState('')
	const { currentUser } = useCurrentUser()

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}

	const handleClose = () => {
		if(loading) return
		setSettingsContent('')
	}

	const handleClick = async () => {
		try {
			if(!password) {
				toast.error('Password field is required.')
				return
			}

			if(!isValidPassword(password)) {
				toast.error('Password should be at least 8 - 20 characters.')
				return
			}

			setLoading(true)

			await passwordConfirmation({ email: currentUser.email, password })
			setCanChangePassword(true)
			setLoading(false)
		}
		catch(e) {
			setLoading(false)
			toast.error(axiosError(e, 'Can not continue. Try again later.'))
		}
	}

	return <>
		{
			loading ? <CircleLoader />
			:
			<div className="s p-3">
				<div className="v-center">
					<HoverableIcon mainIcon={IoIosArrowBack} onClick={handleClose} />
					<p className="vio-label ml-1">Confirm Password</p>
				</div>
				<p className="mt-1 text-vio tracking-wider">Kindly enter your password first to proceed.</p>
					<input
						disabled={loading}
						type="password"
						name="password"
						placeholder="Enter password"
						value={password}
						onChange={onChange}
						className={`
							py-2 outline-none border-b border-vio w text-dark
						`}
					/>
					<div className="h-end mt-3">
						<VioButton label={loading ? "Updating..." : "Continue"} loading={loading || !isValidPassword(password)} onClick={handleClick} />
					</div>
			</div>
		}
	</>
}
