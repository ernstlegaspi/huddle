import toast from 'react-hot-toast'
import { ChangeEvent, useState } from 'react'

import { signIn } from '../../../api/auth/auth'
import { axiosError, setPersistedUser } from '../../../lib/utils'

export default function SignIn() {
	const [data, setData] = useState({ email: '', password: '' })
	const [loading, setLoading] = useState(false)
	const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
	const emailRegex2 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

	const handleClick = async () => {
		try {
			const { email, password } = data

			if(!email || !password) {
				toast.error('All fields are required')
				return
			}
			
			if(!emailRegex.test(email) || !emailRegex2.test(email)) {
				toast.error('Email should be valid')
				return
			}

			if(password.length < 8 || password.length > 20) {
				toast.error('Enter a valid password')
				return
			}

			setLoading(true)

			const { data: resData } = await signIn({ ...data })

			setLoading(false)
			setPersistedUser(resData)
			window.location.reload()
		}
		catch(e: any) {
			setLoading(false)
			toast.error(axiosError(e, 'Can not sign in. Try again later.'))
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value })
	}

	return <>
		<input disabled={loading} value={data?.email} onChange={handleChange} type="email" name="email" placeholder="Email" className="input mb-5" />
		<input disabled={loading} value={data?.password} onChange={handleChange} type="password" name="password" placeholder="Password" className="input mb-2" />
		<p onClick={loading ? () => null : () => {}} className={`${loading ? 'default' : 'pointer'} italic gray-15 hover:underline`}>Forgot Password?</p>
		<button onClick={handleClick} disabled={loading} className={`${loading ? 'text-white font-bold bg-gray-100 rounded-r5 py-2' : 'vio-button hover:bg-dvio'} w-full mt-5 text-20 transition-all`}>
			{loading ? 'Loading...' : 'Sign In'}
		</button>
	</>
}
