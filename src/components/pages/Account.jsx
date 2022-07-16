import React from 'react'
import {useState, useEffect } from 'react'
import jwt_decode from "jwt-decode"
import axios from 'axios'

export default function Account() {
  const [currentUser, setCurrentUser] = useState('')

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem('jwt')
        const decode = jwt_decode(token)
        const currentUserId = decode.id 
        // const currentUserId = decode.id
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${currentUserId}`)
        setCurrentUser(response.data)
      } catch (error) {
        console.warn(error)
      }
    }
    getUser()
  },[])
  return (
    <>
    <div>Account</div>
    <form>
      <label>Profile Pic</label>
      <label htmlFor='firstName'>First Name</label>
      <input 
        type='text'
        id ='firstName'
        // value={}
      /> 
      <label htmlFor='lastName'>Last Name</label>
      <input 
        type='text'
        id ='lastName'
        />
      <label htmlFor='username'>UserName</label>
      <input 
        type='text'
        id='username'
        />
      <label htmlFor='email'>Email</label>
      <input 
        type='text'
        id = 'email'
        />
      <label htmlFor='password'>Password</label>
      <input 
        type='text'
        id = 'password'
      />
    </form>
    </>
  )
}
