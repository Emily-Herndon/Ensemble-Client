import React, { useState } from "react"
import axios from "axios"
import jwt_decode from 'jwt-decode'
import { Navigate } from "react-router-dom"


export default function Login(setCurrentUser, currentUser) {
	const buttonStyles = "rounded-lg text-pink-500 font-semibold p-2 bg-pink-200 hover:bg-pink-300 my-8"
	const inputStyles = "border-2 border-pink-500 p-2 rounded-lg text-pink-500 font-semibold placeholder-pink-400"
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

	return (
		<div>
			{currentUser && (<Navigate to='/profile' />)}
			<h1 className="text-4xl text-pink-400 font-semibold p-6">Welcome Back!</h1>
			<form onSubmit={handleSubmit}>
				<div className={divStyles}>
				<label htmlFor="email" hidden>Enter Email</label>
				<input
					id='email'
					className={inputStyles}
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
					className={inputStyles}
					type="password"
					placeholder="password"
					value={password}
					onChange={e=>setPassword(e.target.value)}
				/>
				</div>
				<button className={buttonStyles}>Login!</button>
			</form>
		</div>
	)
}
