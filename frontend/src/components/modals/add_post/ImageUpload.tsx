import { ChangeEvent } from "react"
import { serverURL } from "../../../constants"

type Props = {
	handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void
	postImage: string
	setTags: React.Dispatch<React.SetStateAction<string>>
	tags: string
}

export default function ImageUpload({ handleImageUpload, postImage, setTags, tags }: Props) {
	return <div className="border-t border-vio/30 flex-1">
		{
			postImage ? <div className="w h-[600px] overflow-y-hidden">
				<div className="relative w h f flex-col">
					<div className="flex-1 w bg-red-500 overflow-hidden">
						<img src={`${serverURL}images/${postImage}`} alt="Temporary Post" className="w h" />
					</div>
					<input
						type="text"
						value={tags}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setTags(e.target.value)}
						placeholder='Add tags about your post; e.g. forest, trees'
						className="border-b border-vio m-3 mt-1 outline-none text-14 p-2 text-dark"
					/>
			</div>
			</div>
			: <div className="f-center flex-col w h">
				<p className="text-dark mb-3 font-medium">Upload an image for your post</p>
				<label htmlFor='postPicture' className="block w-max h-max bg-vio text-white rounded-r5 py-2 px-4 pointer">Select from computer</label>
				<input className="hidden" id="postPicture" type="file" accept="image/*" onChange={handleImageUpload} />
			</div>
		}
	</div>
}
