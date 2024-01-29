import toast from 'react-hot-toast'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

import CloseButton from '../../../../CloseButton'
import VioButton from '../../../../VioButton'

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
		const codeRegex = /^[0-9]*$/
		
		if(code !== inputCode || code.length < 1 || !codeRegex.test(code)) {
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
			<VioButton label={"Continue"} loading={!inputCode} onClick={handleContinue} />
		</div>
	</div>
}
