import React from 'react'
import { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function PasswordModal({ setPasswordModal, setCurrentUser, currentUser }) {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [verifyNewPassword, setVerifyNewPassword] = useState("")
    const [msg, setMsg] = useState("")
    const [submitted, setSubmitted] = useState(false)
    

    const closePasswordModal = () => {
        setPasswordModal(false)
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
            setPasswordModal(false)
            
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

    const buttonStyle = "place-items-center m-2 text-[8px] border-2 border-black w-[80px] h-[40px] text-black m-2 font-press-start font-light p-2 bg-#c0c0c0 hover:border-dotted my-8"
    const inputStyle = "border-2 border-black text-black font-press-start text-[9px] p-2 placeholder-gray-400 w-[200px]"
    return (
        <>
            <div id="authentication-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="closePasswordModal" onClick={() => closePasswordModal()}>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="py-6 px-6 lg:px-8">
                            <h3 className="text-1xl block mb-2 text-black font-press-start pb-4">Change Your Password</h3>
                            {/* form to update password */}
                            <form
                                onSubmit={(e) => handleChangePasswordSubmit(e)}
                                className="space-y-6" action="#"
                            >

                                {/* current password input */}
                                
                                    <label
                                        className="block text-pink-500 font-semibold"
                                        htmlFor="currentPassword"></label>
                                    <input
                                        className={inputStyle}
                                        id="currentPassword"
                                        type="password"
                                        placeholder='Current Password'
                                        value={currentPassword}
                                        onChange={e => { setCurrentPassword(e.target.value) }}
                                    />
                                

                                {/* new password input */}
            
                                    <label
                                        className="block text-pink-500 font-semibold"
                                        htmlFor="newPassword"></label>
                                    <input
                                        className={inputStyle}
                                        id="newPassword"
                                        type="password"
                                        placeholder='New Password'
                                        value={newPassword}
                                        onChange={e => { setNewPassword(e.target.value) }}
                                    />
            

                                {/* verify new password input */}
                       
                                    <label
                                        className="block text-pink-500 font-semibold"
                                        htmlFor="verifyNewPassword"></label>
                                    <input
                                        className={inputStyle}
                                        id="verifyNewPassword"
                                        type="password"
                                        placeholder='Verify New Password'
                                        value={verifyNewPassword}
                                        onChange={e => { setVerifyNewPassword(e.target.value) }}
                                    />
                                


                                {/* password submit button */}
                                <br></br>
                                <button
                                    className={buttonStyle}
                                    type="submit">Change Password
                                    </button>
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