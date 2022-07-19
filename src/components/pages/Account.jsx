import React from 'react'
import { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import FileUploader from '../FileUploader'

export default function Account({ setAccountEdit, setCurrentUser, currentUser, profileImage, setProfileImage, defaultProfileImg}) {
  const navigate = useNavigate()
  const [updatedUser, setUpdatedUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    profileImageFile:""
  })

  const [profileImgFile, setProfileImgFile] = useState(null)
  const [msg, setMsg] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
		setUpdatedUser({ ...updatedUser, profileImageFile: profileImgFile })
	}, [profileImgFile])

  const closeAccountModel = () => {
    setAccountEdit(false)
  }
  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem('jwt')
        const decode = jwt_decode(token)
        const currentUserId = decode.id
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${currentUserId}`)
        setCurrentUser(response.data)
        setUpdatedUser(response.data)
      } catch (error) {
        console.warn(error)
      }
    }
    getUser()
  }, [])

  const handleAccountEditSubmit = async (e, updatedUser) => {
    e.preventDefault()
    try {
      console.log("updatedUser", updatedUser)
      const token = localStorage.getItem('jwt')
      const decode = jwt_decode(token)
      console.log("decode",decode)
      let imgResponse = {}
      if (updatedUser.profileImageFile){
        imgResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/images/upload`, updatedUser.profileImageFile)
      } else {
        imgResponse = { data:{
          _id: ""
        }}
      }
      console.log(imgResponse.data)
      
      const accountReqBody = {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        userName: updatedUser.userName,
        email: updatedUser.email,
        currentUserName: decode.userName,
        currentEmail: decode.email,
        profileImgId: imgResponse.data._id
      }

      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/profile/${currentUser.userName}`, accountReqBody)
      if (localStorage.getItem('jwt')){
        localStorage.removeItem('jwt')
      }
      const respToken = response.data.token
      localStorage.setItem('jwt', respToken)
      
      const decoded = jwt_decode(respToken)
      setCurrentUser(decoded)
      setProfileImage(decoded.profileImg)

      const getResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile/${currentUser.userName}`)
      
      setAccountEdit(false)
      if (response.data.msg) {
        setTimedMessage(response.data.msg, 10000)
      }

    } catch (error) {
      console.warn(error)
      if (error.response.data.msg) {
        setTimedMessage(error.response.data.msg, 10000)
      }
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
    // This is the styling for the buttons and inputs. 
    const buttonStyle = "flex items-center justify-center m-2 text-[8px] border-2 border-black w-[80px] h-[40px] text-black m-2 font-press-start font-light p-2 bg-#c0c0c0 hover:border-dotted my-8 dark:font-sans dark:text-white dark:bg-slate-800 dark:border-solid dark:border-slate-800 dark:hover:bg-slate-700 dark:rounded-lg dark:text-[14px] dark:h-[35px] dark:font-bold"
    const inputStyle = "border-2 border-black text-black font-press-start text-[12px] p-2 placeholder-gray-400 w-[200px] dark:rounded-lg dark:border-2 dark:border-slate-800 dark:font-sans dark:text-slate-800 dark:text-[15px]"

  return (
    <>

      <div id="authentication-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">

          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="closeAccountModel" onClick={() => closeAccountModel()}>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
					<div
						className='flex flex-col justify-center items-center'
					>
					</div>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="text-1xl text-black font-press-start p-6 dark:font-sans dark:text-2xl dark:text-white dark:font-bold">Edit Your Account Information</h3>

              <form
                encType='multipart/form' 
                onSubmit={(e) => handleAccountEditSubmit(e, updatedUser)} 
                className="space-y-6" action="#">

              <FileUploader
                setImgFile={setProfileImgFile}
              />
                <label className='text-black'></label>
                <div>
                  <label htmlFor='firstName'></label>
                  <input
                    className={inputStyle}
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
                    className={inputStyle}
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
                    className={inputStyle}
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
                    className={inputStyle}
                    type='text'
                    id='email'
                    name='email'
                    placeholder='Email'
                    value={updatedUser.email}
                    onChange={e => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                  />
                </div>

                <button type="submit" className={buttonStyle}>Submit</button>
              </form>
             
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
