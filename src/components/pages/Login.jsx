import React, { useState, useEffect } from "react"
import axios from "axios"
import jwt_decode from 'jwt-decode'
import { Navigate } from "react-router-dom"


export default function Login({setCurrentUser, currentUser}) {
	// This is the state for the controlled form.
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')
	
	// This event handler controls the submit functionality.
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// This sets the user's input to reqBody, in order for it to be sent to the backend. 
			// The form data is posted to the backend.
			const reqBody = {
				email,
				password
			}

			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, reqBody)
			console.log(response)
			// The token in saved in local storage.
			const { token } = response.data
			localStorage.setItem('jwt', token)
			// The token is decoded.
			const decoded = jwt_decode(token)

			// The Account is set in App's state to be the decoded token.
			setCurrentUser(decoded)
		}catch (err){
			if (err.res) {
				if (err.res.status === 400) {
					setMsg(err.res.data.msg)
				}
      }
	}
  }
  
	// If the currentUser is logged in...
	if (currentUser) {
		// ...Send them to profile page.
		 <Navigate to='/profile' />
	  }

	// This is the styling for the buttons, inputs, and divs.
	const buttonStyle = "place-items-center m-2 text-[8px] border-2 border-b-black border-l-black border-t-white border-r-white w-[100px] h-[30px] text-black m-2 font-press-start font-light p-2 hover:border-dotted my-8"
    const inputStyle = "border-b-2 border-l-2 border-black text-black font-press-start text-[12px] p-2 placeholder-gray-400 w-[200px] h-[30px]"
	const divStyles = "py-3"

	return (
		<div>
			<h1 className="text-1xl text-black font-press-start p-6">And the best dressed award goes to:</h1>
			<form onSubmit={handleSubmit}>
				<div className={divStyles}>
				<label htmlFor="email" hidden>Enter Email</label>
				<input
					id='email'
					className={inputStyle}
					type="email"
					placeholder="email"
					value={email}
					onChange={e=>setEmail(e.target.value)}
				/>
				</div>
				<div className={divStyles}>
				<label htmlFor="password" hidden>Enter Password</label>
				<input
					id='password'
					className={inputStyle}
					type="password"
					placeholder="password"
					value={password}
					onChange={e=>setPassword(e.target.value)}
				/>
				</div>
				<button className={buttonStyle}>Login</button>
			</form>
		</div>
	)
}
