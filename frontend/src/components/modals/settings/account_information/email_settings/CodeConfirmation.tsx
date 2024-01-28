import toast from 'react-hot-toast'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

import CloseButton from '../../../../CloseButton'

type Props = {
	code: string
	setCode: Dispatch<SetStateAction<string>>
	setCodeValid: Dispatch<SetStateAction<boolean>>
	setSettingsContent: Dispatch<SetStateAction<string>>
}

export default function CodeConfirmation({ code, setCode, setCodeValid, setSettingsContent }: Props) {
	const [inputCode, setInputCode] = useState('')
	const timer = 120
	//eslint-disable-next-line
	const [_, setCount] = useState(timer)
	const expiration = useRef(timer)

	const onInput = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value.replace(/\D/g, '')
	}

	const handleContinue = () => {
		if(code !== inputCode) {
			toast.error("Invalid code")
			return
		}

		setCodeValid(true)
	}

	useEffect(() => {
		const otpExpiration = setInterval(() => {
			if(expiration.current <= 0) {
				setCode('')
				return
			}

			setCount(prev => prev - 1)
			expiration.current--

		}, 1000)

		return () => {
			clearInterval(otpExpiration)
		}
	}, [])

	return <div className="s p-3">
		<div className="v-center mb-2">
			<CloseButton handleClose={() => setSettingsContent('')} />
			<p className="vio-label ml-1">Code Confirmation</p>
		</div>
		<p className="text-vio tracking-wider">To proceed in changing your email, please enter the code that have been sent to your email.</p>
		<p className="text-vio tracking-wider mt-3">Code will expire in: <span className="font-bold">{`${expiration.current < 1 ? "0" : expiration.current} ${expiration.current < 1 ? "" : expiration.current > 1 ? "seconds" : "second"}`}</span></p>
		<div className="my-3 w">
			<input
				max={6}
				maxLength={6}
				value={inputCode}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setInputCode(e.target.value)}
				placeholder="Enter code"
				type="text"
				className="border-b border-vio p-2 outline-none w"
				onInput={onInput}
			/>
		</div>
		<div className="h-end">
			<button disabled={!inputCode} onClick={handleContinue} className={`
				${inputCode ? 'hover:bg-dvio bg-vio border-vio' : 'bg-vio/30 border-vio/30'}
				border text-white rounded-full py-2 px-4 transition-all ml-1
			`}>
				Continue
			</button>
		</div>
	</div>
}
