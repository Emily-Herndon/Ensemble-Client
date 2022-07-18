import {useEffect} from "react"
import {Link} from "react-router-dom"
import { Navbar as Nav} from 'flowbite-react'

export default function Navbar({currentUser, handleLogout}) {
	
	
	const navStyle = "hover:text-gray-700 block py-2 pr-4 pl-3 rounded text-gray-500 md:p-0 font-semibold my-6"
		
	const loggedOut = (
		<>
			<Link 
			className={navStyle}
			to="/login">Login</Link>
			<Link 
			className={navStyle}
			to="/register">Register</Link>
		</>
	)

	const loggedIn = (
		<>
			<Link 
			className={navStyle}
			to="/">Feed</Link>
			<Link 
			className={navStyle}
			to="/Profile">Profile</Link>
			<Link 
			className={navStyle}
			to="/outfitpicker">Browse Closet</Link>
			<Link 
			className={navStyle}
			onClick= {handleLogout}
			to="/login">Logout</Link>
			{/* <Link></Link> */}
		</>	
	)

	return (
		<div className="">
		<Nav fluid={true} rounded={true}>
			<Nav.Brand href="/">
				<span className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-gray-400 to-gray-500 my-6">
				Ensemble
				</span>
			</Nav.Brand>
			<Nav.Toggle />
			<Nav.Collapse>
			{currentUser ? loggedIn : loggedOut}
			</Nav.Collapse>
		</Nav>
		</div>
	)
}
