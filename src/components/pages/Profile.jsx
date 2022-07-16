import axios from 'axios'
import {useState,useEffect} from 'react'
import NewClothes from './NewClothes'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'

export default function Profile({clothes, setClothes,  clothesForm, setClothesForm, currentUser}) {
	const [msg, setMsg] = useState('')
	const [clothingModal, setClothingModal] = useState(false)
	const [editClothingModal, setEditClothingModal] = useState(false)
	const [clothing, setClothing] = useState({
		clothesName: '',
		category: '',
		status: '',
		imageFile: '',
		user:''
	})
	const navigate = useNavigate()
	
	useEffect(() => {
		const clothesGetter = async () => {
			try {
				const token = localStorage.getItem('jwt')
				const decoded = jwt_decode(token)
				const userName = decoded.userName
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile/${userName}`)
				console.log(response.data)
				setClothes(response.data.clothes)
			} catch (error) {
				console.log(error)
			}
		}
		clothesGetter()
	},[])
	const handleEditClothesClick = (clothing) => {
		console.log(clothing)
		setClothesForm(clothing)
		setEditClothingModal(true)
	}

	const handleEditClothesSubmit = async e => {
		e.preventDefault()
		try {
			const reqBody = {
				clothesName:clothesForm.clothesName,
				category:clothesForm.category,
				status:clothesForm.status,
				user:clothesForm.user, 
				// imageId:imgResponse.data._id
			}
			setClothing(reqBody)
			const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/clothes/${clothing.id}`)
		} catch (err) {
			console.warn(err)
			if (err.response) {
				if (err.response.status === 400) {
					setMsg(err.response.data.msg)
				}
			}
		}
	}

	const handleNewClothesSubmit = async e => {
		e.preventDefault()
		try {
			// const fd = new FormData()
			// console.log("imageFile",clothesForm.imageFile)
			// fd.append("image", clothesForm.imageFile)
			// console.log("fd",fd)
			const imgResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/images/upload`, clothesForm.imageFile)
			// console.log(imgResponse.data)
			

			const reqBody = {
				clothesName:clothesForm.clothesName,
				category:clothesForm.category,
				status:clothesForm.status,
				user:clothesForm.user, 
				imageId:imgResponse.data._id
			}

			// console.log("clothesForm on submit",clothesForm)
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/clothes`, reqBody)
			console.log(response.data)
			setClothes([...clothes, response.data])
			setClothesForm({
				clothesName: '',
				category: '',
				status: '',
				imageFile: null,
			})
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
			<div key={`${clothing._id}`}> 
				<img src={clothing.imageId.imgUrl} alt={clothing.clothesName}/>
				{clothing.clothesName} {clothing.status}
				<button 
					className="rounded-lg text-pink-500 font-semibold p-2 bg-pink-200 hover:bg-pink-300 my-8" 
					type="button" 
					data-modal-toggle="clothing-modal" 
					onClick={()=>handleEditClothesClick(clothing)}
				>
					Edit
				</button>
			</div>

		)
	
	
  return (
	<div className='content-center'>
		<div className="text-4xl text-pink-400 font-semibold p-6">Hey there! Welcome to your profile.</div>
		{clothingModal ? 
		<NewClothes 
			handleSubmit={handleNewClothesSubmit}
			clothesForm={clothesForm}
			setClothesForm={setClothesForm}
			setClothingModal={setClothingModal}
		/>
		:
		""
		}
		{editClothingModal ? 
		<NewClothes 
			handleSubmit={handleEditClothesSubmit}
			clothesForm={clothesForm}
			setClothesForm={setClothesForm}
			setClothingModal={setEditClothingModal}
		/>
		:
		""
		}
		{/* <!-- Modal toggle --> */}
		<div className='flex justify-center'>
			<button className="rounded-lg text-pink-500 font-semibold p-2 bg-pink-200 hover:bg-pink-300 my-8" type="button" onClick={() => navigate('/account')}>Edit Account</button>
			<button className="rounded-lg text-pink-500 font-semibold p-2 bg-pink-200 hover:bg-pink-300 my-8" type="button" data-modal-toggle="clothing-modal" onClick={()=>setClothingModal(true)}>
			Add Clothing Item
			</button>
		</div>
		{sortedClothes}
		
	</div>
  )
}

