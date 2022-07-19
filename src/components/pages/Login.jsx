import React, { useState, useEffect } from "react"
import axios from "axios"
import jwt_decode from 'jwt-decode'
import { Navigate } from "react-router-dom"


export default function Login({setCurrentUser, currentUser}) {
	const divStyles = "py-3"
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')
	
	// console.log(localStorage)
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			//this sets whatever the user entered in the input boxes to reqBody so that it can be sent to the back end 
			//be checked if that user exists
			const reqBody = {
				email,
				password
			}

			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, reqBody)
			console.log(response)
			// save the token in local storage
			const { token } = response.data
			console.log(response.data)
			//sets the local storage item with a key value pair with the key being 'jwt' and the value being the response.data
			localStorage.setItem('jwt', token)
			//decode the token 
			const decoded = jwt_decode(token)

			//set the user in App's state to be the decoded token 
			setCurrentUser(decoded)
		}catch (err){
			if (err.res) {
				if (err.res.status === 400) {
					setMsg(err.res.data.msg)
				}
      }
	}
  }
  console.log(currentUser)
//if currentUser is logged in 

	if (currentUser) {
		//then send them to profile page
		 <Navigate to='/profile' />
	  }

	const buttonStyle = "place-items-center m-2 text-[8px] border-2 border-b-black border-l-black border-t-white border-r-white w-[100px] h-[30px] text-black m-2 font-press-start font-light p-2 hover:border-dotted my-8"
    const inputStyle = "border-b-2 border-l-2 border-black text-black font-press-start text-[12px] p-2 placeholder-gray-400 w-[200px] h-[30px]"

	return (
		<div>
			{/* {currentUser != null && (<Navigate to='/profile' />)} */}
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
