import { useState } from 'react'
import { IconType } from 'react-icons'
import { FaFacebookF, FaGoogle } from "react-icons/fa"

import SignIn from './SignIn'
import SignUp from './SignUp'

export default function Auth() {
	const [isSignIn, setIsSignIn] = useState(true)

	const SocialButton = ({ icon: Icon, text }: { icon: IconType, text: string }) => <>
		<div className="mt-3 w-full f-center vio-button text-white text-20 pointer transition-all hover:bg-dvio">
			<Icon />
			<p className="ml-1">{text}</p>
		</div>
	</>

	return <div className="w h-[100vh] f">
		<div className="w-1/2 h">
			<div className="h-end items-center h">
				<p className="lemon text-white text-[100px]">Huddle</p>
			</div>
		</div>
		<div className="w-1/2 h">
			<div className="h-end h">
				<div className="bg-white scroll w-1/2 h px-6 pb-6 relative">
					<p className="text-vio text-35 font-bold text-center my-5">
						{isSignIn ? "Sign In" : "Sign Up"}
					</p>
					{isSignIn ? <SignIn /> : null}
					{isSignIn ? null : <SignUp />}
					<p className="gray-15 mt-2">
						{isSignIn ? "Don't have an account?" : "Already have an account?"}
						<span onClick={() => setIsSignIn(prev => !prev)} className="pointer italic underline ml-[3px] hover:text-black">
							{isSignIn ? "Sign Up" : "Sign In"}
						</span>
					</p>
					<div className="w-full bg-gray-400 h-[1px] mt-5"></div>
					<div className="rounded-full p-2 bg-white absolute tgray left-1/2 translate-x-[-50%] mt-[-23px]">or</div>
					<div className="mt-6 mb-3">
						<SocialButton icon={FaGoogle} text={isSignIn ? "Sign in with Google" : "Sign up with Google"} />
					</div>
					<SocialButton icon={FaFacebookF} text={isSignIn ? "Sign in with Facebook" : "Sign up with Facebook"} />
				</div>
			</div>
		</div>
	</div>
}
