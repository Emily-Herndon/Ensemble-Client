import logo from "./logo.svg"
import "./App.css"
import NavBar from "./components/Navbar"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
	return (
		<>
			<Router>
				<NavBar />
				<div className="App">
					<h1>hi</h1>
					<Routes>
						<Route />
						<Route />
						<Route />
						<Route />
						<Route />
						<Route />
					</Routes>
				</div>
			</Router>
		</>
	)
}

export default App
