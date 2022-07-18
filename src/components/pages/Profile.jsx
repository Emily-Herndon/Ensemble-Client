import axios from 'axios'
import { useState, useEffect } from 'react'
import DeleteClothesModal from '../DeleteClothesModal'
import NewClothes from '../NewClothes'
import ClothesCard from '../ClothesCard'
import jwt_decode from "jwt-decode"
import { useNavigate, useParams } from 'react-router-dom'
import Account from './Account'
import PasswordModal from './PasswordModal'

export default function Profile({ clothes, setClothes, clothesForm, setClothesForm, currentUser, setCurrentUser }) {
	const [msg, setMsg] = useState('')
	const [clothingModal, setClothingModal] = useState(false)
	const [editClothingModal, setEditClothingModal] = useState(false)
	const [editOrAdd, setEditOrAdd] = useState('add')
	const [deleteModal, setDeleteModal] = useState(false)
	const [accountEdit, setAccountEdit] = useState(false)
	const [passwordModal, setPasswordModal] = useState(false) 
	const [clothing, setClothing] = useState({
		_id: '',
		clothesName: '',
		category: 'default',
		status: 'default',
		imageFile: '',
		user: ''
	})
	const navigate = useNavigate()

	useEffect(() => {
		const clothesGetter = async () => {
			try {
				const token = localStorage.getItem('jwt')
				const decoded = jwt_decode(token)
				setCurrentUser(decoded)
				const userName = decoded.userName
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile/${userName}`)
				console.log(response.data)
				setClothes(response.data.clothes)
			} catch (error) {
				console.log(error)
			}
		}
		clothesGetter()
	}, [])

	// when you click the edit button on a clothing item
	const handleEditClothesClick = (clothing) => {
		console.log("CLOTHINGITEM🧥",clothing)
		setClothesForm(clothing)
		setEditOrAdd("edit")
		setEditClothingModal(true)
	}
	// when you click on the add clothing item button
	const handleAddClothesClick = () => {
		setEditOrAdd('add')
		setClothingModal(true)
	}
	// when you click on the delete button on a clothing item
	const handleDeleteClothesClick = (clothing) => {
		setClothing(clothing)
		setDeleteModal(true)
	}
	// when you click on the edit account button
	const handleAccountClick = () => {
		setAccountEdit(true)
		
	}
	// when you click on the edit password button
	const handlePasswordClick = () => {
		setPasswordModal(true)
	}
	// when you add a clothing item
	const handleNewClothesSubmit = async e => {
		e.preventDefault()
		try {
			// upload new image to backend to be uploaded to cloudinary
			const imgResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/images/upload`, clothesForm.imageFile)
		console.log(currentUser)
			// configuring data for creating a new clothing
			const reqBody = {
				clothesName: clothesForm.clothesName,
				category: clothesForm.category,
				status: clothesForm.status,
				user: currentUser.id,
				imageId: imgResponse.data._id
			}

			// hit server to create new clothing
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/clothes`, reqBody)

			// add clothing to clothes, ******* not sure if this is working properly
			setClothes([...clothes, response.data])

			// reset clothes form
			setClothesForm({
				clothesName: '',
				category: 'default',
				status: 'default',
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
	// when you edit a clothing item
	const handleEditClothesSubmit = async e => {
		e.preventDefault()
		try {
			console.log("CURRENT USER",currentUser)
			const userName = currentUser.userName
			const reqBody = {
				clothesName: clothesForm.clothesName,
				category: clothesForm.category,
				status: clothesForm.status,
				user: clothesForm.user,
				// imageId:imgResponse.data._id
			}
			setClothing(reqBody)
			await axios.put(`${process.env.REACT_APP_SERVER_URL}/clothes/${clothesForm._id}`, reqBody)
			setEditClothingModal(false)
			setEditOrAdd("add")
			const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile/${userName}`)
			setClothes(response.data.clothes)
		} catch (err) {
			console.warn(err)
			if (err.response) {
				if (err.response.status === 400) {
					setMsg(err.response.data.msg)
				}
			}
		}
	}
	// when you delete a clothing item
	const handleClothingDelete = async(e, clothing) => {
		e.preventDefault()
		try {
			console.log(currentUser)
			// get current user's username
			const userName = currentUser.userName
			
			const clothingId = clothing._id
			await axios.delete(`${process.env.REACT_APP_SERVER_URL}/clothes/${clothingId}`)
			const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile/${userName}`)
			setClothes(response.data.clothes)
			setDeleteModal(false)
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
		onePiece: 3,
		bottom: 2,
		top: 1
	}
	// console.log(clothes)
	const sortedClothes = clothes.sort((a, b) => priority[b.category] > priority[a.category] ? -1 : 1)
		.map((clothing) =>
			<ClothesCard
				key={`${clothing._id}`}
				clothing={clothing}
				handleEditClothesClick={handleEditClothesClick}
				handleDeleteClothesClick={handleDeleteClothesClick}
			/>
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
					editOrAdd={editOrAdd}
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
					editOrAdd={editOrAdd}
				/>
				:
				""
			}

			<div>
				<button className="rounded-lg text-pink-500 font-semibold p-2 bg-pink-200 hover:bg-pink-300 my-8" type="button" data-modal-toggle="account-model" onClick={() => handleAddClothesClick()}>Add Clothing Item</button>
			</div>
				

			<div className=''>
				<button className="rounded-lg text-pink-500 font-semibold p-2 bg-pink-200 hover:bg-pink-300 my-8" type="button" data-modal-toggle="password-model" onClick={() => handlePasswordClick()}>Change Password</button>
			</div>
				
			<div>
				<button className="rounded-lg text-pink-500 font-semibold p-2 bg-pink-200 hover:bg-pink-300 my-8" type="button" onClick={() => handleAccountClick()}>Edit Account</button>
			</div>
			{deleteModal ?
				<DeleteClothesModal
					deleteModal={deleteModal}
					setDeleteModal={setDeleteModal}
					handleClothingDelete={handleClothingDelete}
					clothing={clothing}
				/>
				:
				""
			}
			{accountEdit ?
			<Account 
				currentUser={currentUser}
				setCurrentUser={setCurrentUser}
				setAccountEdit={setAccountEdit}
			/>
			:
			""
			}

			{passwordModal ?
				<PasswordModal
					currentUser={currentUser}
					setCurrentUser={setCurrentUser}
					setPasswordModal={setPasswordModal}
				/>
				:
				""
			}
			<div
				className='flex justify-center'
			>
				<div
					className='grid grid-cols-3 gap-6'
				>
					{sortedClothes}
				</div>
			</div>

		</div>
	)
}

