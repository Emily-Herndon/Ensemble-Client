import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Navbar as Nav } from 'flowbite-react'
import { Flowbite } from "flowbite-react"
import { DarkThemeToggle } from "flowbite-react"

export default function Navbar({ currentUser, handleLogout }) {

	const navStyle = "hover:text-gray-700 block py-2 pr-4 pl-3 text-black md:p-0 font-press-start my-6 text-[10px]"

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
				onClick={handleLogout}
				to="/login">Logout</Link>
			{/* <Link></Link> */}
			<div className="rounded-lg h-10 mt-3">
			<Flowbite>
  				<DarkThemeToggle />
			</Flowbite>
			</div>
		</>
	)

	return (
		<div className="">
			<Nav fluid={true} rounded={true}>
				<Nav.Brand href="/">
					<span className="font-press-start text-transparent text-1xl bg-clip-text bg-gradient-to-r from-gray-600 to-black my-6">
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
