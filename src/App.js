import logo from "./logo.svg"
import "./App.css"
import NavBar from "./components/Navbar"
import { Navigate } from "react-router-dom"
import Login from "./components/pages/Login"
import Feed from "./components/pages/Feed"
import Account from './components/pages/Account'
import Register from "./components/pages/Register"
import PasswordModal from "./components/pages/PasswordModal"
// import NewClothes from "./components/pages/NewClothes"
import OutfitPicker from "./components/pages/OutfitPicker"
import Profile from "./components/pages/Profile"
import Error from "./components/pages/Error"
import TestPageImgUploader from "./components/pages/TestPageImgUploader"
import jwt_decode from 'jwt-decode'
import {useState, useEffect} from "react"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from "axios"

function App() {
	const [currentUser, setCurrentUser] = useState(null)
	// const [authed, setAuthed] = useState(null)
	const [clothesForm, setClothesForm] = useState({
		clothesName: '',
		category: '',
		status: '',
		imageFile: '',
		user:''
	})
	const [clothes, setClothes] = useState([])
	const defaultProfileImg = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
	//useEffect -- if the user navigates away from the page, we will og them back in 
	useEffect(() => {
		//check to see if token is in local storage in the
		const token = localStorage.getItem('jwt')
		
		//if there is a token then...
		if(token) {
			//decode it and set the user in app state
			const decoded = jwt_decode(token)
			setCurrentUser(decoded)
			// setAuthed(jwt_decode(token))
			setClothesForm({...clothesForm, user: decoded.id})
			
		}else{
			setCurrentUser(null)
		}
		const getUserClothes = async () => {
			const decoded = jwt_decode(token)
			const userName = decoded.userName
			const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile/${userName}`)
			// console.log(response.data)
			setClothes(response.data.clothes)
		}
		getUserClothes()
	}, [])


	const handleLogout = () => {
		// check to see if a token exists in local storage
		if (localStorage.getItem('jwt')) {
		  // if so, delete it
		  localStorage.removeItem('jwt')
		  // set the user in the App state to be null
		  setCurrentUser(null)
		//   setAuthed(null)
		}
	  }

	  

	return (
		<>
			<Router>
				<NavBar 
				currentUser={currentUser}
				handleLogout={handleLogout}
				/>
				<div className="App">
					<Routes>
						<Route
							path="/"
							element={<Navigate to='/profile' />}
						/>
						<Route
							path="/login"
							element={currentUser?
							<Navigate to='/profile' />
							:<Login setCurrentUser={setCurrentUser} currentUser={currentUser}/>}
						/>
						<Route
							path="/register"
							element={currentUser?
							<Navigate to='/profile' />
							:<Register setCurrentUser={setCurrentUser} currentUser={currentUser}/>}
						/>
						<Route
							path="/profile"
							element={<Profile 
								clothesForm={clothesForm}
								setClothesForm={setClothesForm}
								clothes={clothes}
								setClothes={setClothes}
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
								defaultProfileImg = {defaultProfileImg}
							/>}
						/>
						<Route
							path="/feed"
							element={<Feed />}
						/>
						{/* <Route
							path="/newclothes"
							element={<NewClothes />}
						/> */}
						<Route
							path="/outfitpicker"
							element={<OutfitPicker 
								clothes={clothes}
								currentUser={currentUser}
							/>}
						/>
						<Route
							path="/error"
							element={<Error />}
						/>

						{/* TEST PAGE FOR BILLY BELOW */}
						<Route
							path="/testpageimguploader"
							element={<TestPageImgUploader />}
						/>

					</Routes>
				</div>
			</Router>
		</>
	)
}

export default App
