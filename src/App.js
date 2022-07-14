import logo from "./logo.svg"
import "./App.css"

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
					</Routes>
				</div>
			</Router>
		</>
	)
}

export default App
