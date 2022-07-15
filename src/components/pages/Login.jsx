import React from "react"

export default function Login() {
	return (
		<div>
			<form>
				<label htmlFor="email" hidden>Enter Email</label>
				<input
					id='email'
					className="border"
					type="email"
					placeholder="email"
				/>
				<label htmlFor="password" hidden>Enter Password</label>
				<input
					id='password'
					className="border"
					type="password"
					placeholder="password"
				/>
				<button>Submit?</button>
			</form>
		</div>
	)
}
