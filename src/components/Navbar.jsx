import React from "react"
import {Link} from "react-router-dom"

export default function Navbar() {
	return (
		<div>
			<Link to="/login">Login</Link>
			<Link to="/register">Register</Link>
			<Link to="/">Feed</Link>
			<Link to="/Profile">Profile</Link>
			<Link to="/outfitpicker">OutfitPicker</Link>
			<Link to="/">Logout</Link>
			{/* <Link></Link> */}
		</div>
	)
}
