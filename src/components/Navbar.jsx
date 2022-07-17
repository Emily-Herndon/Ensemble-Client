import {useEffect} from "react"
import {Link} from "react-router-dom"
import { Navbar as Nav} from 'flowbite-react'

export default function Navbar({currentUser, handleLogout}) {
	const navStyle = "hover:text-pink-600 block py-2 pr-4 pl-3 rounded text-pink-400 md:p-0 font-semibold my-6"
		
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
		<Nav fluid={true} rounded={true}>
			<Nav.Brand href="/">
				<span className="font-extrabold text-transparent text-1xl bg-clip-text bg-gradient-to-r from-pink-600 to-pink-400 my-6">
				Ensemble
				</span>
			</Nav.Brand>
			<Nav.Toggle />
			<Nav.Collapse>
			{currentUser ? loggedIn : loggedOut}
			</Nav.Collapse>
		</Nav>
	)
}
