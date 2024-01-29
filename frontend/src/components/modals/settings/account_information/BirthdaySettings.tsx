import { ChangeEvent, useState } from "react"
import CloseButton from "../../../CloseButton"
import { months, days, years } from "../../../../constants"
import useCurrentUser from "../../../../hooks/useCurrentUser"
import VioButton from "../../../VioButton"
import toast from "react-hot-toast"
import { axiosError, birthdayFormatter } from "../../../../lib/utils"
import { updateBirthday } from "../../../../api/api"

export default function BirthdaySettings({ setSettingsContent }: { setSettingsContent: React.Dispatch<React.SetStateAction<string>> }) {
	const { currentUser: user } = useCurrentUser()
	const birthday = user.birthday.split(" ")
	const [date, setDate] = useState({ month: birthday[0], day: birthday[1].split(",")[0], year: birthday[2] })
	const [loading, setLoading] = useState(false)

	const handleClose = () => {
		if(loading) return
		setSettingsContent('')
	}

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setDate({ ...date, [e.target.name]: e.target.value })
	}

	const handleClick = async () => {
		try {
			const { day, month, year } = date
			const _birthday = birthdayFormatter(day, month, year)
			
			if(_birthday === user.birthday) {
				toast.error('There are no changes in the date.')
				return
			}

			setLoading(true)

			await updateBirthday({ email: user.email, birthday: _birthday })

			setLoading(false)
			setSettingsContent('')
		}
		catch(e) {
			setLoading(false)
			toast.error(axiosError(e, 'Can not update birthday. Try again later.'))
		}
	}
	
	return <div className="s p-3">
		<div className="v-center mb-3">
			<CloseButton handleClose={handleClose} />
			<p className="ml-1 vio-label text-20">Change Birthday</p>
		</div>
		<div className="f flex-col">
			<div>
				<select
					disabled={loading}
					onChange={handleChange}
					value={date.month}
					name="month"
					className={`${loading ? 'bg-gray-100' : ''} w-[40%] tgray outline-none pointer border border-vio p-2 rounded-r5`}
				>
					{months.map(month => <option key={month} value={month}>{month}</option>)}
				</select>

				<select
					disabled={loading}
					onChange={handleChange}
					value={date.day}
					name="day"
					className={`${loading ? 'bg-gray-100' : ''} w-[20%] mx-3 tgray outline-none pointer border border-vio p-2 rounded-r5`}
				>
					{days.map(day => <option key={day} value={day}>{day}</option>)}
				</select>

				<select
					disabled={loading}
					onChange={handleChange}
					value={date.year}
					name="year"
					className={`${loading ? 'bg-gray-100' : ''} w-[34.6%] tgray outline-none pointer border border-vio p-2 rounded-r5`}
				>
					{years.reverse().map(year => <option key={year} value={year}>{year}</option>)}
				</select>
			</div>
			<div className="h-end mt-3">
				<VioButton label={loading ? "Updating..." : "Update"} loading={loading} onClick={handleClick} />
			</div>
		</div>
	</div>
}
