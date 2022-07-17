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
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [verifyNewPassword, setVerifyNewPassword] = useState("")
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
    console.log('hi')
    try {
      // console.log('CURRENT USER',currentUser)
      console.log('UPDATED USER', updatedUser)
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/profile/${currentUser.userName}`, updatedUser)

      console.log(response)
      return
      const getResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile/${currentUser.userName}`)
      setTimedMessage(response.data.msg, 10000)
      // console.log('getresponse data 🧐',getResponse.data)
      // navigate('/profile')
    } catch (error) {
      console.warn(error)
      setTimedMessage(error.response.data.msg, 10000)
    }
  }

  // handle password change submit
  const handleChangePasswordSubmit = async (e) => {
    try {
      e.preventDefault()
      // get current user from jwt
      const jwtToken = localStorage.getItem("jwt")
      const decoded = jwt_decode(jwtToken)
      const userId = decoded.id
      console.log(userId)

      // verifies if the new pass is not the same as the old password
      if (newPassword !== verifyNewPassword) {
        setMsg("Password Validation Failed, new password and verify new password must be the same")
        console.log(msg)
        return
      }

      // console.log("change password")
      // facilitates change password
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/changepassword`, {
        currentPassword,
        newPassword,
        userId
      })
      // console.log(passwordReqBody)
      setTimedMessage(response.data.msg, 10000)
      setCurrentPassword("")
      setNewPassword("")
      setVerifyNewPassword("")

    } catch (error) {
      console.log("error:", error)
      setTimedMessage(error.response.data.msg, 10000)
      setCurrentPassword("")
      setNewPassword("")
      setVerifyNewPassword("")
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
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="closeAccountModel" onClick={() => closeAccountModel()}>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
           
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>

              <form onSubmit={(e) => handleAccountEditSubmit(e, updatedUser)} className="space-y-6" action="#">


                <label>Profile Pic</label>
                <div>
                  <label htmlFor='firstName'>First Name</label>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    value={updatedUser.firstName}
                    onChange={e => setUpdatedUser({ ...updatedUser, firstName: e.target.value })}
                  />

                </div>

                <div>
                  <label htmlFor='lastName'>Last Name</label>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={updatedUser.lastName}
                    onChange={e => setUpdatedUser({ ...updatedUser, lastName: e.target.value })}
                  />
                </div>


                <div>
                  <label htmlFor='username'>UserName</label>
                  <input
                    type='text'
                    id='username'
                    name='userName'
                    value={updatedUser.userName}
                    onChange={e => setUpdatedUser({ ...updatedUser, userName: e.target.value })}
                  />
                </div>


                <div>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='text'
                    id='email'
                    name='email'
                    value={updatedUser.email}
                    onChange={e => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                  />
                </div>

                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
              </form>
              {/* form to update password */}
              <form
                onSubmit={(e) => handleChangePasswordSubmit(e)}
                className="space-y-6" action="#"
              >
                {/* current password input */}
                <div className="grid grid-cols-2 m-2">
                  <div>
                    <label
                      className="font-['Roboto'] pl-12"
                      htmlFor="currentPassword">Current Password: </label>
                    <input
                      className="border border-sm font-['Roboto'] rounded-lg"
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={e => { setCurrentPassword(e.target.value) }}
                    />
                  </div>
                </div>
                {/* new password input */}
                <div className="grid grid-cols-2 m-2">
                  <div>
                    <label
                      className="font-['Roboto'] pl-12"
                      htmlFor="newPassword">New Password: </label>
                    <input
                      className="border border-sm font-['Roboto'] rounded-lg"
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={e => { setNewPassword(e.target.value) }}
                    />
                  </div>
                </div>

                {/* verify new password input */}
                <div className="grid grid-cols-2 m-2">
                  <div>
                    <label
                      className="font-['Roboto'] pl-12"
                      htmlFor="verifyNewPassword">Verify New Password: </label>
                    <input
                      className="border border-sm font-['Roboto'] rounded-lg"
                      id="verifyNewPassword"
                      type="password"
                      value={verifyNewPassword}
                      onChange={e => { setVerifyNewPassword(e.target.value) }}
                    />
                  </div>
                </div>


                {/* password submit button */}
                <button
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="submit">Change Password</button>
              </form>
              {submitted &&
                msg
              }
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
