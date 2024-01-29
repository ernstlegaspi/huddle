import toast from "react-hot-toast"
import { ChangeEvent, useState } from "react"

import AccountForm from "../Form"
import useCurrentUser from "../../../../../hooks/useCurrentUser"
import { emailOtp, updateEmail } from "../../../../../api/api"
import { axiosError, emailRegex, emailRegex2 } from "../../../../../lib/utils"
import CircleLoader from "../../../../CircleLoader"
import CodeConfirmation from "./CodeConfirmation"

export default function EmailSettings({ setSettingsContent }: { setSettingsContent: React.Dispatch<React.SetStateAction<string>> }) {
	const { currentUser } = useCurrentUser()
	const [loading, setLoading] = useState(false)
	const [otpLoading, setOptLoading] = useState(false)
	const [email, setEmail] = useState(currentUser.email)
	const [code, setCode] = useState('')
	const [codeValid, setCodeValid] = useState(false)
	const [willChangeEmail, setWillChangeEmail] = useState(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}

	const handleSubmit = async () => {
		try {
			if(!email) {
				toast.error('Email field is required.')
				return
			}

			if(email === currentUser.email) {
				toast.error('There are no changes in email.')
				return
			}

			if(!emailRegex.test(email) || !emailRegex2.test(email)) {
				toast.error("Enter a valid email")
				return
			}

			setLoading(true)

			await updateEmail({ email })

			localStorage.setItem('huddle_user', JSON.stringify({
				name: currentUser.name,
				email,
				username: currentUser.username,
				picture: currentUser.picture
			}))

			setLoading(false)
			setSettingsContent('')
		}
		catch(e) {
			setLoading(false)
			toast.error(axiosError(e, 'Can not update email. Try again later.'))
		}
	}
	
	const handleCancel = () => {
		setSettingsContent('')
	}

	const handleContinue = async () => {
		try {
			setOptLoading(true)
			const { data } = await emailOtp({ to: currentUser.email })

			setOptLoading(false)
			setWillChangeEmail(true)
			setCode(data?.otp)
		}
		catch(e) {
			setOptLoading(false)
			toast.error('Can not proceed. Try again later.')
		}
	}

	const Confirmation = () => <div className="s p-3">
		<p className="vio-label mb-3">Are you sure you want to change email?</p>
		<div className="f">
			<button disabled={otpLoading} onClick={handleCancel} className="border border-vio rounded-full py-2 px-4 text-vio transition-all hover:text-white hover:bg-vio">Cancel</button>
			<button disabled={otpLoading} onClick={handleContinue} className="border border-vio bg-vio text-white rounded-full py-2 px-4 transition-all hover:bg-dvio ml-1">Continue</button>
		</div>
	</div>

	return <>
		{
			otpLoading ? <CircleLoader /> : codeValid ? <AccountForm
				handleSubmit={handleSubmit}
				inputLabel="Email"
				label="Change Email"
				loading={loading}
				name="Email"
				onChange={handleChange}
				placeholder="Email..."
				setSettingsContent={setSettingsContent}
				value={email}
			/> : willChangeEmail ? <CodeConfirmation code={code} setCode={setCode} setCodeValid={setCodeValid} setSettingsContent={setSettingsContent} /> : <Confirmation />
		}
	</>
}
