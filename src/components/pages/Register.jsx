import React from "react"

export default function Register() {
	return (
		<div>
			<form
				onSubmit=""
			>
				<label htmlFor="firstName" hidden>Enter First Name</label>
				<input
					id='firstName'
					className="border"
					placeholder="First Name"
				/>
				<label htmlFor="lastName" hidden>Enter Last Name</label>
				<input
					id='lastName'
					className="border"
					placeholder="Last Name"
				/>
				<label htmlFor="userName" hidden>Enter Username</label>
				<input
					id="userName"
					className="border"
					placeholder="Username"
				/>
				<label htmlFor="email" hidden>Enter Email</label>
				<input
					id='email'
					className="border"
					placeholder="Email"
					type="email"
				/>
				<label htmlFor="password" hidden>Enter Password</label>
				<input
					id='password'
					className="border"
					placeholder="Password"
					type="password"
				/>
				<button
					type="submit"
				>Submit?</button>
			</form>
		</div>
	)
}
