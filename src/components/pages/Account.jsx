import React from 'react'
import { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Account({ setAccountEdit, setCurrentUser, currentUser }) {
  const navigate = useNavigate()
  const [updatedUser, setUpdatedUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: ""
  })

  const [msg, setMsg] = useState("")
  const [submitted, setSubmitted] = useState(false)



  const closeAccountModel = () => {
    setAccountEdit(false)
  }
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
  }, [])

  const handleAccountEditSubmit = async (e, updatedUser) => {
    e.preventDefault()
    try {
      // console.log('CURRENT USER',currentUser)
      console.log('UPDATED USER', updatedUser)
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/profile/${currentUser.userName}`, updatedUser)

      console.log(response)
      return
      const getResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile/${currentUser.userName}`)
      
      setAccountEdit(false)
      setTimedMessage(response.data.msg, 10000)
      // console.log('getresponse data 🧐',getResponse.data)

    } catch (error) {
      console.warn(error)
      setTimedMessage(error.response.data.msg, 10000)
    }
  }

    // set timed message function
    const setTimedMessage = (message, time) => {
      setMsg(message)
      setSubmitted(true)
      setTimeout(() => {
          setSubmitted(false)
          setMsg("")
      }, time)
  }


  return (
    <>

      <div id="authentication-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">

          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 right-2.5 text-pink-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="closeAccountModel" onClick={() => closeAccountModel()}>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
           
            <div className="py-6 px-6 lg:px-8">
              <h3 className="text-2xl block mb-2 text-pink-500 font-semibold pb-4">Edit Your Account Information</h3>

              <form onSubmit={(e) => handleAccountEditSubmit(e, updatedUser)} className="space-y-6" action="#">


                <label className='text-pink-500'>Profile Pic</label>
                <div>
                  <label htmlFor='firstName'></label>
                  <input
                    className="border-2 rounded border-pink-400 text-pink-500 p-2.5 placeholder-pink-400 focus:ring-pink-500 w-[200px]"
                    type='text'
                    id='firstName'
                    name='firstName'
                    placeholder='First Name'
                    value={updatedUser.firstName}
                    onChange={e => setUpdatedUser({ ...updatedUser, firstName: e.target.value })}
                  />

                </div>

                <div>
                  <label htmlFor='lastName'></label>
                  <input
                    className="border-2 rounded border-pink-400 text-pink-500 p-2.5 placeholder-pink-400 focus:ring-pink-500 w-[200px]"
                    type='text'
                    id='lastName'
                    name='lastName'
                    placeholder='Last Name'
                    value={updatedUser.lastName}
                    onChange={e => setUpdatedUser({ ...updatedUser, lastName: e.target.value })}
                  />
                </div>


                <div>
                  <label htmlFor='username'></label>
                  <input
                    className="border-2 rounded border-pink-400 text-pink-500 p-2.5 placeholder-pink-400 focus:ring-pink-500 w-[200px]"
                    type='text'
                    id='username'
                    name='userName'
                    placeholder='Username'
                    value={updatedUser.userName}
                    onChange={e => setUpdatedUser({ ...updatedUser, userName: e.target.value })}
                  />
                </div>


                <div>
                  <label htmlFor='email'></label>
                  <input
                    className="border-2 rounded border-pink-400 text-pink-500 p-2.5 placeholder-pink-400 focus:ring-pink-500 w-[200px]"
                    type='text'
                    id='email'
                    name='email'
                    placeholder='Email'
                    value={updatedUser.email}
                    onChange={e => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                  />
                </div>

                <button type="submit" className="rounded-lg text-pink-500 font-semibold p-2 bg-pink-200 hover:bg-pink-300 my-8">Submit</button>
              </form>
             
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
