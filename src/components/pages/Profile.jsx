import axios from 'axios'
import {useState,useEffect} from 'react'
import NewClothes from './NewClothes'
import jwt_decode from "jwt-decode"

export default function Profile({clothes, setClothes,  clothesForm, setClothesForm, currentUser}) {
	const [msg, setMsg] = useState('')
	
	useEffect(() => {
		const clothesGetter = async () => {
			try {
				const token = localStorage.getItem('jwt')
				const decoded = jwt_decode(token)
				const userName = decoded.userName
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile/${userName}`)
				setClothes(response.data.clothes)
			} catch (error) {
				console.log(error)
			}
		}
		clothesGetter()
	},[])

	const handleNewClothesSubmit = async e => {
		e.preventDefault()
		try {
			const fd = new FormData()
			console.log("imageFile",clothesForm.imageFile)
			fd.append("image", clothesForm.imageFile)
			console.log("fd",fd)
			

			const reqBody = {
				clothesName:clothesForm.clothesName,
				category:clothesForm.category,
				status:clothesForm.status,
				user:clothesForm.user
			}

			console.log("clothesForm on submit",clothesForm)
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/clothes`, fd)
			// console.log(response.data)
			// setClothes([...clothes, response.data])
			// setClothesForm({
			// 	clothesName: '',
			// 	category: '',
			// 	status: '',
			// 	imageFile: '',
			// })
		} catch (err) {
			console.warn(err)
			if (err.response) {
				if (err.response.status === 400) {
					setMsg(err.response.data.msg)
				}
			}
		}
	}

	const priority = {
		shoes: 4,
		onePiece:3,
		bottom:2,
		top:1
	}
	// console.log(clothes)
	const sortedClothes = clothes.sort((a, b) => priority[b.category] > priority[a.category] ? -1 : 1)
		.map((clothing) =>
			<div key={`${clothing._id}`}> {clothing.clothesName} </div>
		)

	
  return (
	<div className='content-center'>
		<div className="text-4xl text-pink-400 font-semibold p-6">Hey there! Welcome to your profile.</div>

		<NewClothes 
		handleSubmit={handleNewClothesSubmit}
		clothesForm={clothesForm}
		setClothesForm={setClothesForm}
		/>
		
		{sortedClothes}
		
	</div>
  )
}

