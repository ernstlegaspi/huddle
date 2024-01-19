import { ChangeEvent } from "react"
import { BsEmojiSmile } from "react-icons/bs"

import HoverableIcon from "../../HoverableIcon"

type Props = {
	body: string
	disabled: boolean
	handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
	handlePostClick: () => void
	isNext: boolean
}

export default function Form({ body, disabled, handleChange, handlePostClick, isNext }: Props) {
	return <>
		<textarea
			disabled={disabled}
			value={body}
			onChange={handleChange}
			className={`${isNext ? 'border-y' : 'border-t'} p-3 resize-none flex-1 border-vio/30 outline-none text-dark`}
			placeholder="What's on your mind?">
		</textarea>
		<div className="h-bet my-2 px-2">
			<HoverableIcon mainIcon={BsEmojiSmile} onClick={() => {}} />
			<button onClick={disabled ? () => {} : () => handlePostClick()} className={`
				${body.length < 1 || disabled ? 'default bg-vio/20' : 'pointer bg-vio'}
				text-white px-4 py-2 rounded-full transition-all
			`}>
				Post
			</button>
		</div>
	</>
}
