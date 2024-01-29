import toast from "react-hot-toast"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"

import PasswordConfirmation from "./PasswordConfirmation"
import Input from "../../../../Input"
import CloseButton from "../../../../CloseButton"
import useCurrentUser from "../../../../../hooks/useCurrentUser"
import { axiosError, isValidPassword } from "../../../../../lib/utils"
import { updatePassword } from "../../../../../api/api"

export default function PasswordSetting({ setSettingsContent }: { setSettingsContent: Dispatch<SetStateAction<string>> }) {
	const [canChangePassword, setCanChangePassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' })
	const { currentUser } = useCurrentUser()

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value })
	}

	const handleClose = () => {
		if(loading) return
		setSettingsContent('')
	}

	const handleClick = async () => {
		try {
			const { currentPassword, newPassword, confirmNewPassword } = data
			
			if(!currentPassword || !newPassword || !confirmNewPassword) {
				toast.error('All fields are required.')
				return
			}

			if(!isValidPassword(currentPassword) || !isValidPassword(newPassword) || !isValidPassword(confirmNewPassword)) {
				toast.error('Password length should be 8 - 20 characters.')
				return
			}

			if(newPassword !== confirmNewPassword) {
				toast.error('New password and confirm new password should be the same.')
				return
			}

			setLoading(true)

			await updatePassword({
				email: currentUser.email,
				currentPassword,
				confirmNewPassword,
				newPassword
			})

			toast.success('Password changed successfully.')
			setLoading(false)
			setSettingsContent('')
		}
		catch(e) {
			setLoading(false)
			toast.error(axiosError(e, 'Can not update password. Try again later.'))
		}
	}

	return <>
		{
			canChangePassword
			? <div className="s p-3">
				<div className="v-center mb-4">
					<CloseButton handleClose={handleClose} />
					<p className="vio-label ml-1">Change Password</p>
				</div>
				<Input
					disabled={loading}
					type="Password"
					value={data.currentPassword}
					onChange={onChange}
					name="currentPassword"
					placeholder="Enter current password"
					label="Current Password"
				/>
				<div className="w my-6">
					<Input
						disabled={loading}
						type="Password"
						value={data.newPassword}
						onChange={onChange}
						name="newPassword"
						placeholder="Enter new password"
						label="New Password"
					/>
				</div>
				<Input
					disabled={loading}
					type="Password"
					value={data.confirmNewPassword}
					onChange={onChange}
					name="confirmNewPassword"
					placeholder="Confirm new password"
					label="Confirm Password"
				/>
				<div className="mt-3 h-end">
					<button disabled={loading} onClick={handleClick} className={`
						${loading ? 'bg-vio/30' : 'bg-vio hover:bg-dvio'}
						transition-all py-2 px-4 text-white rounded-full
					`}>
						{loading ? "Updating..." : "Update"}
					</button>
				</div>
			</div>
			: <PasswordConfirmation setCanChangePassword={setCanChangePassword} setSettingsContent={setSettingsContent} />
		}
	</>
}
