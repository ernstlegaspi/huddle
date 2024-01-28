import { AxiosError } from 'axios'
import toast from "react-hot-toast"
import { ChangeEvent, useState } from "react"

import { days, interestsArr, months, years } from "../../../constants"
import { signUp } from '../../../api/api'
import { emailRegex, emailRegex2, nameRegex } from '../../../lib/utils'

export default function SignUp() {
	const [data, setData] = useState<User>({ name: '', username: '', password: '', email: '', birthday: '', interests: [] })
	const [date, setDate] = useState({ month: '', day: '', year: '' })
	const [loading, setLoading] = useState(false)
	const [confirmPassword, setConfirmPassword] = useState('')
	const [interestsArray, setInterests] = useState<string[]>([])
	const [isClicked, setIsClicked] = useState(false)
	const [hasSubmitted, setHasSubmitted] = useState(false)

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
			${loading ? 'bg-gray-100 border-gray-100' : 'pointer border-vio'}
			${loading ? '' : interestsArray.includes(text) ? 'bg-vio text-white shadow shadow-vio' : 'bg-white text-vio'}
			${loading ? '' : isClicked ? '' : 'hover:text-white hover:bg-vio'}
			rounded-full border py-2 px-4 transition-all w-max
		`}>
			{text}
		</div>
	}

	const handleClick = async () => {
		if(loading) return
		
		setHasSubmitted(true)

		try {
			const { name, password, email } = data
			const { day, month, year } = date

			if(!name || !password || !confirmPassword) {
				toast.error('All fields are required.')
				return
			}

			if(!nameRegex.test(name)) {
				toast.error("Enter a valid name.")
				return
			}
			
			if(!emailRegex.test(email) || !emailRegex2.test(email)) {
				toast.error("Enter a valid email address.")
				return
			}

			if(password.length < 8 || password.length > 20 || confirmPassword.length < 8 || confirmPassword.length > 20) {
				toast.error('Password should be 8 - 20 characters.')
				return
			}
			
			if(password !== confirmPassword) {
				toast.error('Passwords should be the same.')
				return
			}
			
			if(!day || !month || !year) {
				toast.error('Enter a valid birthday.')
				return
			}

			if(interestsArray.length < 5) {
				toast.error('Interests should be at least 5.')
				return
			}

			setLoading(true)

			const { data: resData } = await signUp({
				...data,
				birthday: `${date.month} ${date.day}, ${date.year}`,
				interests: interestsArray,
				username: `${name.replace(" ", "")}`
			})

			setLoading(false)
			localStorage.setItem('huddle_user', JSON.stringify(resData))
			window.location.reload()
		}
		catch(e: any) {
			setLoading(false)

			if(e instanceof AxiosError) {
				const data = e?.response?.data
				const { message }: { message: string } = data

				if(message) {
					toast.error(message)
					return
				}
			}

			toast.error("Can not sign up. Try again later.")
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value })
	}
	
	return <>
		<input type="text"
			// autoComplete='off'
			disabled={loading}
			name="name"
			placeholder="Name"
			value={data?.name}
			onChange={handleChange}
			className={`${loading ? 'bg-gray-100' : hasSubmitted && !data?.name ? 'bg-rose-300/20 rounded-t-r5' : ''} input mb-5`}
		/>

		<input type="email"
			// autoComplete='off'
			disabled={loading}
			name="email"
			placeholder="Email"
			value={data?.email}
			onChange={handleChange}
			className={`${loading ? 'bg-gray-100' : hasSubmitted && !data?.email ? 'bg-rose-300/20 rounded-t-r5' : ''} input mb-5`}
		/>

		<input type="password"
			disabled={loading}
			name="password"
			placeholder="Password"
			value={data?.password}
			onChange={handleChange}
			className={`${loading ? 'bg-gray-100' : hasSubmitted && !data?.password ? 'bg-rose-300/20 rounded-t-r5' : ''} input mb-5`}
		/>

		<input type="password"
			disabled={loading}
			name="confirmPassword"
			placeholder="Confirm Password"
			value={confirmPassword}
			onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
			className={`${loading ? 'bg-gray-100' : hasSubmitted && !confirmPassword ? 'bg-rose-300/20 rounded-t-r5' : ''} input mb-5`}
		/>

		<p className="tgray mb-1">Birthday</p>

		<select
			disabled={loading}
			onChange={(e: ChangeEvent<HTMLSelectElement>) => setDate({ ...date, month: e.target.value })}
			value={date.month}
			className={`${loading ? 'bg-gray-100' : ''} tgray outline-none pointer border border-vio p-2 rounded-r5`}
		>
			{months.map(month => <option key={month} value={month}>{month}</option>)}
		</select>

		<select
			disabled={loading}
			onChange={(e: ChangeEvent<HTMLSelectElement>) => setDate({ ...date, day: e.target.value })}
			value={date.day}
			className={`${loading ? 'bg-gray-100' : ''} mx-3 tgray outline-none pointer border border-vio p-2 rounded-r5`}
		>
			{days.map(day => <option key={day} value={day}>{day}</option>)}
		</select>

		<select
			disabled={loading}
			onChange={(e: ChangeEvent<HTMLSelectElement>) => setDate({ ...date, year: e.target.value })}
			value={date.year}
			className={`${loading ? 'bg-gray-100' : ''} mb-5 tgray outline-none pointer border border-vio p-2 rounded-r5`}
		>
			{years.reverse().map(year => <option key={year} value={year}>{year}</option>)}
		</select>

		<p className="tgray mb-2">Interests <span className="text-14">(Pick at least 5 interestsArray...)</span></p>
		<div className="f flex-wrap gap-3">
			{interestsArr.map(_interest => <Interest key={_interest} text={_interest} />)}
		</div>
		<button
			disabled={loading}
			onClick={handleClick}
			className={`${loading ? 'bg-gray-300 text-white font-bold rounded-r5 py-2' : 'vio-button hover:bg-dvio'}  w-full mt-5 text-20 transition-all`}
		>
			{loading ? 'Loading...' : 'Sign Up'}
		</button>
	</>
}
