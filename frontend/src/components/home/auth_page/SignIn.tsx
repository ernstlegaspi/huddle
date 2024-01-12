export default function SignIn() {
	return <>
		<input type="email" name="email" placeholder="Email" className="input mb-5" />
		<input type="password" name="password" placeholder="Password" className="input mb-2" />
		<p className="italic pointer gray-15 hover:underline">Forgot Password?</p>
		<button className="vio-button w-full mt-5 text-20 transition-all hover:bg-dvio">Sign In</button>
	</>
}