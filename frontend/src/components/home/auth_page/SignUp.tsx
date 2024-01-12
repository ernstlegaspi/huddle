import { useState } from "react"

import { days, interestsArr, months, years } from "../../../constants"

export default function SignUp() {
	const [interests, setInterests] = useState<string[]>([])
	const [isClicked, setIsClicked] = useState(false)

	const Interest = ({ text }: { text: string }) => {
		const handleClick = () => {
			const existingInterests = [...interests]

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
			${interests.includes(text) ? 'bg-vio text-white shadow shadow-vio' : 'bg-white text-vio'}
			${isClicked ? '' : 'hover:text-white hover:bg-vio'}
			rounded-full border border-vio py-2 px-4 pointer transition-all w-max
		`}>
			{text}
		</div>
	}
	
	return <>
		<input type="text" name="name" placeholder="Name" className="input mb-5" />
		<input type="email" name="email" placeholder="Email" className="input mb-5" />
		<input type="password" name="password" placeholder="Password" className="input mb-5" />
		<input type="password" name="confirmPassword" placeholder="Confirm Password" className="input mb-5" />
		<p className="tgray mb-1">Birthday</p>
		<select className="tgray outline-none pointer border border-vio p-2 rounded-r5" name="months">
			{months.map(month => <option key={month} value={month}>{month}</option>)}
		</select>
		<select className="mx-3 tgray outline-none pointer border border-vio p-2 rounded-r5" name="months">
			{days.map(day => <option key={day} value={day}>{day}</option>)}
		</select>
		<select className="mb-5 tgray outline-none pointer border border-vio p-2 rounded-r5" name="months">
			{years.reverse().map(year => <option key={year} value={year}>{year}</option>)}
		</select>
		<p className="tgray mb-2">Interests <span className="text-14">(Pick at least 5 interests...)</span></p>
		<div className="f flex-wrap gap-3">
			{interestsArr.map(_interest => <Interest key={_interest} text={_interest} />)}
		</div>
		<button onClick={() => {}} className="vio-button w-full mt-5 text-20 transition-all hover:bg-dvio">Next</button>
	</>
}