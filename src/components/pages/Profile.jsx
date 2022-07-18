import axios from 'axios'
import { useState, useEffect } from 'react'
import DeleteClothesModal from '../DeleteClothesModal'
import NewClothes from '../NewClothes'
import ClothesCard from '../ClothesCard'
import jwt_decode from "jwt-decode"
import { useNavigate, useParams } from 'react-router-dom'
import Account from './Account'
import PasswordModal from './PasswordModal'
import ShowClothingCards from '../ShowClothingCards'
import TagsModal from '../TagsModal'

export default function Profile({ clothes, setClothes, clothesForm, setClothesForm, currentUser, setCurrentUser }) {
	const [msg, setMsg] = useState('')
	const [clothingModal, setClothingModal] = useState(false)
	const [editClothingModal, setEditClothingModal] = useState(false)
	const [editOrAdd, setEditOrAdd] = useState('add')
	const [deleteModal, setDeleteModal] = useState(false)
	const [accountEdit, setAccountEdit] = useState(false)
	const [passwordModal, setPasswordModal] = useState(false)
	const [all,setAll] = useState([])
	const [tops, setTops] = useState([])
	const [bottoms, setBottoms] = useState([])
	const [onePieces, setOnePieces] = useState([])
	const [shoes, setShoes] = useState([])
	const [access, setAccess] = useState([])
	const [selectCat, setSelectCat] = useState("all")
	const [showCat, setShowCat] = useState([])
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

				// all clothes but sorted by priority
				const sortedClothes = response.data.clothes.sort((a, b) => priority[b.category] > priority[a.category] ? -1 : 1)
				setAll(sortedClothes)
				setShowCat(sortedClothes)

				// filter tops out of response
				const filteredTops = response.data.clothes.filter((clothes) => {
					return clothes.category.includes("top")
				})
				setTops(filteredTops)
				console.log("filteredTops", tops)

				// filter bottoms out of response
				const filteredBottoms = response.data.clothes.filter((clothes) => {
					return clothes.category.includes("bottom")
				})
				setBottoms(filteredBottoms)
				console.log("filteredBottoms", bottoms)

				// filter one piece out of response
				const filteredOnePiece = response.data.clothes.filter((clothes) => {
					return clothes.category.includes("onePiece")
				})
				setOnePieces(filteredOnePiece)
				console.log("filteredOnePiece", onePieces)


				// filter shoes out of response
				const filteredShoes = response.data.clothes.filter((clothes) => {
					return clothes.category.includes("onePiece")
				})
				setShoes(filteredShoes)
				console.log("filteredShoes", shoes)

				// filter accessories out of response
				const filteredAccess = response.data.clothes.filter((clothes) => {
					return clothes.category.includes("accessory")
				})
				setAccess(filteredAccess)
				console.log("filteredAccess", access)

			} catch (error) {
				console.log(error)
			}
		}
		clothesGetter()
	}, [])

	// use state to set the show clothing category based on select Cat value
	useEffect(() => {
		if (selectCat == "top"){
			setShowCat(tops)
		} else if (selectCat == "bottom"){
			setShowCat(bottoms)
		} else if (selectCat == "onePiece") {
			setShowCat(onePieces)
		}	else if (selectCat == "shoes") {
			setShowCat(shoes)
		} 	else if (selectCat == "accessory") {
			setShowCat(access)
	}		else if (selectCat == "all") {
			setShowCat(all)
		}
		console.log(showCat)
	}, [selectCat])

	// when you click the edit button on a clothing item
	const handleEditClothesClick = (clothing) => {
		// console.log("CLOTHINGITEM🧥",clothing)
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
			console.log(reqBody)
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
			// console.log("CURRENT USER", currentUser)
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
	const handleClothingDelete = async (e, clothing) => {
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
	


	return (
		<>
			{currentUser ?

				<div className='content-center'>
					<div className="text-4xl text-white font-semibold p-6">Hey there! Welcome to your profile {currentUser.userName}.</div>

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


					<button className="border rounded-lg text-gray-500 font-semibold p-2 bg-white hover:bg-gray-200 my-8" type="button" data-modal-toggle="account-model" onClick={() => handleAddClothesClick()}>Add Clothing Item</button>
					<button className="border rounded-lg text-gray-500 font-semibold p-2 bg-white hover:bg-gray-200 my-8" type="button" data-modal-toggle="password-model" onClick={() => handlePasswordClick()}>Change Password</button>
					<button className="border rounded-lg text-gray-500 font-semibold p-2 bg-white hover:bg-gray-200 my-8" type="button" onClick={() => handleAccountClick()}>Edit Account</button>


					<div
						className='flex flex-row justify-center'
					>

						<div
							className='border rounded-lg h-[50px] w-[120px] mb-8 bg-white text-gray-500 font-semibold'
							onClick={()=>{setSelectCat("all")}}
						>All</div>

						<div
							className='border rounded-lg h-[50px] w-[120px] bg-white text-gray-500 font-semibold'
							onClick={()=>{setSelectCat("top")}}
						>Top</div>

						<div
							className='border rounded-lg h-[50px] w-[120px] bg-white text-gray-500 font-semibold'
							onClick={()=>{setSelectCat("bottom")}}
						>Bottom</div>

						<div
							className='border rounded-lg h-[50px] w-[120px] bg-white text-gray-500 font-semibold'
							onClick={()=>{setSelectCat("onePiece")}}
						>One Piece</div>

						<div
							className='border rounded-lg h-[50px] w-[120px] bg-white text-gray-500 font-semibold'
							onClick={()=>{setSelectCat("shoes")}}
						>Shoes</div>

						<div
							className='border rounded-lg h-[50px] w-[120px] bg-white text-gray-500 font-semibold'
							onClick={()=>{setSelectCat("accessory")}}
						>Accessories</div>
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
							{/* {sortedClothes} */}
							<ShowClothingCards 
								clothes = {showCat}
								handleEditClothesClick = {handleEditClothesClick}
								handleDeleteClothesClick = {handleDeleteClothesClick}
							/>
						</div>
					</div>

				</div>
				: "Loading"}
		</>
	)
}

