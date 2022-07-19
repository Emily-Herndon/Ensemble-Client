import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import jwt_decode from "jwt-decode"
import axios from "axios"


export default function Register({ currentUser, setCurrentUser }) {
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

		if (currentUser) {
			// Send them to profile page.
			<Navigate to='/profile' />
		}


	const divStyles = "py-3"
	const buttonStyle = "place-items-center m-2 text-[8px] border-2 border-b-black border-l-black border-t-white border-r-white w-[100px] h-[30px] text-black m-2 font-press-start font-light p-2 hover:border-dotted my-8"
    const inputStyle = "border-b-2 border-l-2 border-black text-black font-press-start text-[12px] p-2 placeholder-gray-400 w-[200px] h-[30px]"

	return (
		<div className="">
			<h1 className="text-1xl text-black font-press-start p-6">When your closet is virtual, </h1>
			<form
				className="mt-8"
				onSubmit={handleRegisterSubmit}
			>
				<div
					className={divStyles}
				>
					<label htmlFor="firstName" hidden>Enter First Name</label>
					<input
						id='firstName'
						className={inputStyle}
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
						className={inputStyle}
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
						className={inputStyle}
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
						className={inputStyle}
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
						className={inputStyle}
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
					className={buttonStyle}
					type="submit"
				>Register</button>
				<h1 className="text-1xl text-black font-press-start p-6">you don't have to worry about folding clothes.</h1>
			</form>
		</div>
	)
}