import logo from "./logo.svg"
import "./App.css"
import NavBar from "./components/Navbar"
import { Link } from "react-router-dom"
import Login from "./components/pages/Login"
import Feed from "./components/pages/Feed"
import Register from "./components/pages/Register"
import NewClothes from "./components/pages/NewClothes"
import OutfitPicker from "./components/pages/OutfitPicker"
import Profile from "./components/pages/Profile"
import Error from "./components/pages/Error"

import {useState} from "react"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
	const [currentUser, setCurrentUser] = useState(null)
	const [authed, setAuthed] = useState(null)

	const handleLogout = () => {
		// check to see if a token exists in local storage
		if (localStorage.getItem('jwt')) {
		  // if so, delete it
		  localStorage.removeItem('jwt')
		  // set the user in the App state to be null
		  setCurrentUser(null)
		  setAuthed(null)
	
		}
	  }

	return (
		<>
			<Router>
				<NavBar />
				<div className="App">
					<Routes>
						<Route
							path="/"
							element={<Feed />}
						/>
						<Route
							path="/login"
							element={<Login />}
						/>
						<Route
							path="/register"
							element={<Register />}
						/>
						<Route
							path="/profile"
							element={<Profile />}
						/>
						<Route
							path="/feed"
							element={<Feed />}
						/>
						<Route
							path="/newclothes"
							element={<NewClothes />}
						/>
						<Route
							path="/outfitpicker"
							element={<OutfitPicker />}
						/>
						<Route
							path="/error"
							element={<Error />}
						/>
					</Routes>
				</div>
			</Router>
		</>
	)
}

export default App
