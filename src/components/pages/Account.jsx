import React from 'react'
import {useState, useEffect } from 'react'
import jwt_decode from "jwt-decode"
import axios from 'axios'

export default function Account({setCurrentUser, currentUser}) {
  
  const [updatedUser, setUpdatedUser] = useState({
    firstName:"",
    lastName:"",
    userName:"",
    email:""
  })

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem('jwt')
        const decode = jwt_decode(token)
        const currentUserId = decode.id 
        // const currentUserId = decode.id
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${currentUserId}`)
        setCurrentUser(response.data)
        setUpdatedUser(response.data)
        // console.log(response.data)
      } catch (error) {
        console.warn(error)
      }
    }
    getUser()
  },[])

  const handleSubmit = async (e, updatedUser) => {
    e.preventDefault()
    console.log('hi')
    try {
      console.log('CURRENT USER',currentUser)
      console.log('UPDATED USER',updatedUser)
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/profile/${currentUser.userName}`, updatedUser)
      const getResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile/${currentUser.userName}`)
      console.log('getresponse data 🧐',getResponse.data)
    } catch (error) {
      
    }
  }

  return (
    <>
    <div>Account</div>
    <form onSubmit={(e) => handleSubmit(e, updatedUser)}>
      <label>Profile Pic</label>
      <label htmlFor='firstName'>First Name</label>
      <input 
        type='text'
        id ='firstName'
        name='firstName'
        value={updatedUser.firstName}
        onChange={e => setUpdatedUser({...updatedUser, firstName: e.target.value})}
      /> 
      <label htmlFor='lastName'>Last Name</label>
      <input 
        type='text'
        id ='lastName'
        name='lastName'
        value={updatedUser.lastName}
        onChange={e => setUpdatedUser({...updatedUser, lastName: e.target.value})}
        />
      <label htmlFor='username'>UserName</label>
      <input 
        type='text'
        id='username'
        name='userName'
        value={updatedUser.userName}
        onChange={e => setUpdatedUser({...updatedUser, userName: e.target.value})}
        />
      <label htmlFor='email'>Email</label>
      <input 
        type='text'
        id = 'email'
        name='email'
        value={updatedUser.email}
        onChange={e => setUpdatedUser({...updatedUser, email: e.target.value})}
        />
      {/* <label htmlFor='password'>Password</label>
      <input 
        type='text'
        id = 'password'
      /> */}
      <button type='submit'>Submit</button>
    </form>
    </>
  )
}
