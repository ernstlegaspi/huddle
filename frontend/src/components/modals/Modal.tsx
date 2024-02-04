import { lazy, Suspense } from 'react'

import CircleLoader from '../CircleLoader'
import {
	useAddPostModal,
	useChangeCoverPhotoModal,
	useChangePictureModal,
	useEditProfileModal,
	useNotificationTabModal,
	useSettingsModal,
	useViewCoverPhotoModal,
	useViewProfilePictureModal
} from '../../hooks/useToggleModal'

const AddPostModal = lazy(() => import("./add_post/AddPostModal"))
const ChangeCoverPhotoModal = lazy(() => import("./change_picture/ChangeCoverPhotoModal"))
const ChangePictureModal = lazy(() => import("./change_picture/ChangePictureModal"))
const EditProfileModal = lazy(() => import("./edit_profile/EditProfileModal"))
const NotificationTab = lazy(() => import("../notification/NotificationTab"))
const SettingsModal = lazy(() => import("./settings/SettingsModal"))
const ViewCoverPhotoModal = lazy(() => import("./ViewCoverPhotoModal"))
const ViewProfilePictureModal = lazy(() => import("./ViewProfilePictureModal"))

export default function Modal() {
	const { isOpen: addPost } = useAddPostModal()
	const { isOpen: changeCoverPhoto } = useChangeCoverPhotoModal()
	const { isOpen: changePicture } = useChangePictureModal()
	const { isOpen: editProfile } = useEditProfileModal()
	const { isOpen: notificationTab } = useNotificationTabModal()
	const { isOpen: settings } = useSettingsModal()
	const { isOpen: viewCoverPhoto } = useViewCoverPhotoModal()
	const { isOpen: viewProfilePicture } = useViewProfilePictureModal()

	return <>
		<Suspense fallback={<div className="z-[70] fixed inset-0 bg-dark/50 f-center"><CircleLoader /></div>}>
			{addPost ? <AddPostModal /> : null}
			{changeCoverPhoto ? <ChangeCoverPhotoModal /> : null}
			{changePicture ? <ChangePictureModal /> : null}
			{editProfile ? <EditProfileModal /> : null}
			{notificationTab ? <NotificationTab /> : null}
			{settings ? <SettingsModal /> : null}
			{viewCoverPhoto ? <ViewCoverPhotoModal /> : null}
			{viewProfilePicture ? <ViewProfilePictureModal /> : null}
		</Suspense>
	</>
}
