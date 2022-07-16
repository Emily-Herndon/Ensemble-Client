import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import jwt_decode from "jwt-decode"
import axios from "axios"


export default function Register({ currentUser, setCurrentUser }) {
	const divStyles = "py-3"
	const buttonStyles = "rounded-lg text-pink-500 font-semibold p-2 bg-pink-200 hover:bg-pink-300 my-8"
	const inputStyles = "border-2 border-pink-500 p-2 rounded-lg text-pink-500 font-semibold placeholder-pink-400"

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [userName, setUserName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

	const handleRegisterSubmit = async (e) => {
		e.preventDefault()
		try {
			const reqBody = {
				firstName,
				lastName,
				userName,
				email,
				password
			}
			console.log(reqBody)
			// create new user and return response
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/register`, reqBody)
			console.log(response)
			//grab token from response
			const { token } = response.data

			//set token to jwt in local storage
			localStorage.setItem('jwt', token)

			// decode token
			const decoded = jwt_decode(token)

			// set Current user with decoded token
			setCurrentUser(decoded)

		} catch (err) {
			console.warn(err)
			if (err.response) {
				if (err.response.status === 400) {
					console.log(err.response.data.msg)
					setMsg(err.response.data.msg)
				}
			}
		}
	}
	// useEffect(() => {
		if (currentUser) {
			//then send them to profile page
			<Navigate to='/profile' />
		}
	// }, [])


	return (
		<div className="">
			<form
				className="mt-12"
				onSubmit={handleRegisterSubmit}
			>
				<div
					className={divStyles}
				>
					<label htmlFor="firstName" hidden>Enter First Name</label>
					<input
						id='firstName'
						className={inputStyles}
						placeholder="First Name"
						value={firstName}
						onChange={e => setFirstName(e.target.value)}
					/>
				</div>

				<div
					className={divStyles}
				>
					<label htmlFor="lastName" hidden>Enter Last Name</label>
					<input
						id='lastName'
						className={inputStyles}
						placeholder="Last Name"
						value={lastName}
						onChange={e => setLastName(e.target.value)}
					/>
				</div>

				<div
					className={divStyles}
				>
					<label htmlFor="userName" hidden>Enter Username</label>
					<input
						id="userName"
						className={inputStyles}
						placeholder="Username"
						value={userName}
						onChange={e => setUserName(e.target.value)}
					/>
				</div>
				<div
					className={divStyles}
				>
					<label htmlFor="email" hidden>Enter Email</label>
					<input
						id='email'
						className={inputStyles}
						placeholder="Email"
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div
					className={divStyles}
				>
					<label htmlFor="password" hidden>Enter Password</label>
					<input
						id='password'
						className={inputStyles}
						placeholder="Password"
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div>
				{msg}
				</div>
				<button
					className={buttonStyles}
					type="submit"
				>Create Account!</button>
			</form>
		</div>
	)
}