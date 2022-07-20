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

export default function Profile({ clothes, setClothes, clothesForm, setClothesForm, currentUser, setCurrentUser, defaultProfileImg }) {
	const [msg, setMsg] = useState('')
	const [clothingModal, setClothingModal] = useState(false)
	const [editClothingModal, setEditClothingModal] = useState(false)
	const [editOrAdd, setEditOrAdd] = useState('add')
	const [deleteModal, setDeleteModal] = useState(false)
	const [accountEdit, setAccountEdit] = useState(false)
	const [profileImage, setProfileImage] = useState("")
	const [passwordModal, setPasswordModal] = useState(false)
	const [selectCat, setSelectCat] = useState("all")
	const [showCat, setShowCat] = useState([])
	const [tags, setTags] = useState([])
	const [tagModal, setTagModal] = useState(false)
	const [tagModalType, setTagModalType] = useState("")
	const [selectedTags, setSelectedTags] = useState([])
	const [pageLoaded, setPageLoaded] = useState(false)
	const [tagForm, setTagForm] = useState({
		tagName: ""
	})
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
				// console.log("responseData", response.data)
				setClothes(response.data.clothes)
				setTags(response.data.tags)
				if (response.data.profileImg){
					setProfileImage(response.data.profileImg.imgUrl)
				} else {
					setProfileImage(defaultProfileImg)
				}
				setPageLoaded(true)
			} catch (error) {
				console.log(error)
			}
		}
		clothesGetter()
	}, [])

	// use state to set the show clothing category based on select Cat value
	useEffect(() => {
		if (selectCat == "top") {
			const filteredTops = clothes.filter((clothes) => {
				return clothes.category.includes("top")
			})
			setShowCat(filteredTops)
		} else if (selectCat == "bottom") {
			const filteredBottoms = clothes.filter((clothes) => {
				return clothes.category.includes("bottom")
			})
			setShowCat(filteredBottoms)
		} else if (selectCat == "onePiece") {
			const filteredOnePiece = clothes.filter((clothes) => {
				return clothes.category.includes("onePiece")
			})
			setShowCat(filteredOnePiece)
		} else if (selectCat == "shoes") {
			const filteredShoes = clothes.filter((clothes) => {
				return clothes.category.includes("shoes")
			})
			setShowCat(filteredShoes)
		} else if (selectCat == "accessory") {
			const filteredAccess = clothes.filter((clothes) => {
				return clothes.category.includes("accessory")
			})
			setShowCat(filteredAccess)
		} else if (selectCat == "all") {
			const sortedAllClothes = clothes.sort((a, b) => priority[b.category] > priority[a.category] ? -1 : 1)
			setShowCat(sortedAllClothes)
		}
		// console.log(showCat)
	}, [selectCat, clothes])

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
	// when you click on the create a tag button 
	const handleCreateTagsClick = () => {
		setTagModal(true)
		setTagModalType("create")
	}
	// when you click on the add tags button
	const handleAddTagsClick = (clothing) => {
		setTagModal(true)
		setTagModalType("add")
		setSelectedTags(clothing.tags)
	}
	// when you create a tag
	const handleTagSubmit = async (e, tagForm) => {
		e.preventDefault()
		try {
			console.log("TAGFORM 🏷", tagForm)
			console.log("CURRENTUSERID", currentUser.id)
			const reqBody = {
				tagName: tagForm.tagName,
				user: currentUser.id
			}
			const tagResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/tags`, reqBody)
			setTags([...tags, tagResponse.data])
			setTagForm({
				tagName: ""
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
	// when you add tags to a clothing item
	const handleEditTagsSubmit = async (e, selectedTags) => {
		e.preventDefault()
		try {
			console.log(selectedTags)
			
		} catch (err) {
			console.warn(err)
			if (err.response) {
				if (err.response.status === 400) {
					setMsg(err.response.data.msg)
				}
			}
		}
	}
	// when you delete a tag
	const handleDeleteTag = async (e, tag) => {
		e.preventDefault()
		try {
			// console.log(tag)
			// console.log(currentUser)
			const userName = currentUser.userName
			const tagId = tag._id
			await axios.delete(`${process.env.REACT_APP_SERVER_URL}/tags/${tagId}`)
			const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile/${userName}`)
			setTags(response.data.tags)
		} catch (err) {
			console.warn(err)
			if (err.response) {
				if (err.response.status === 400) {
					setMsg(err.response.data.msg)
				}
			}
		}
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
				status: 'Clean',
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
			setClothesForm({
				clothesName: '',
				category: 'default',
				status: 'Clean',
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

	const buttonStyles = "flex items-center justify-center text-[8px] border-2 border-b-black border-l-black border-t-white border-r-white w-[105px] h-[34px] text-black m-2 font-press-start font-light p-2 hover:border-dotted my-8 dark:font-sans dark:text-white dark:bg-slate-800 dark:border-solid dark:border-slate-800 dark:hover:bg-slate-700 dark:rounded-lg dark:text-[14px] dark:h-[45px] dark:w-[150px] leading-none align-baseline dark:font-bold"
	const buttonStyle = "text-[8px] border-2 border-b-black border-l-black border-t-white border-r-white w-[105px] h-[34px] text-black m-2 font-press-start font-light p-2 hover:border-dotted my-8 dark:font-sans dark:text-white dark:bg-slate-800 dark:border-solid dark:border-slate-800 dark:hover:bg-slate-700 dark:rounded-lg dark:text-[14px] dark:h-[45px] dark:w-[150px] leading-none align-baseline dark:font-bold"
	
	return (
		<>
			{currentUser && pageLoaded ?
			
				<div className='content-center'>
					<div className="text-1xl text-black font-press-start p-6 dark:font-sans dark:text-2xl dark:text-white dark:font-bold">Welcome to your profile, {currentUser.userName}.</div>
					<div
						className='flex justify-center'
					>
					<img 
						src={profileImage}
						className='h-[200px] w-[200px] border-4 border-l-black border-b-black mt-4 dark:rounded-full dark:border-white object-cover'
						
					/>
					</div>


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

					<button className={buttonStyle} type="button" data-modal-toggle="password-model" onClick={() => handlePasswordClick()}>Change Password</button>
					<button className={buttonStyle} type="button" onClick={() => handleAccountClick()}>Edit Account</button>
					<button className={buttonStyle} type="button" data-modal-toggle="account-model" onClick={() => handleAddClothesClick()}>Add Clothing</button>
		
					<div
						className='flex flex-row justify-center'
					>

						<div
							className={buttonStyles}
							onClick={() => { setSelectCat("all") }}
						>All</div>

						<div
							className={buttonStyles}
							onClick={() => { setSelectCat("top") }}
						>Tops</div>

						<div
							className={buttonStyles}
							onClick={() => { setSelectCat("bottom") }}
						>Bottoms</div>

						<div
							className={buttonStyles}
							onClick={() => { setSelectCat("onePiece") }}
						>One Pieces</div>

						<div
							className={buttonStyles}
							onClick={() => { setSelectCat("shoes") }}
						>Shoes</div>

						{/* <div
							className={buttonStyle}
							onClick={() => { setSelectCat("accessory") }}
						>Accessories</div> */}
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
							profileImage={profileImage}
							setProfileImage={setProfileImage}
							defaultProfileImg = {defaultProfileImg}
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
					{tagModal ?
						<TagsModal
							setTagModal={setTagModal}
							handleSubmit={handleTagSubmit}
							tagForm={tagForm}
							setTagForm={setTagForm}
							tagModalType={tagModalType}
							selectedTags={selectedTags}
							setSelectedTags={setSelectedTags}
							tags={tags}
							handleEditTagsSubmit={handleEditTagsSubmit}
							handleDeleteTag={handleDeleteTag}
						/>
						:
						""
					}
					<div
						className='flex justify-center'
					>
						<div
							className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
						>
							<ShowClothingCards
								clothes={showCat}
								handleEditClothesClick={handleEditClothesClick}
								handleDeleteClothesClick={handleDeleteClothesClick}
								handleAddTagsClick={handleAddTagsClick}
								selectedTags={selectedTags}
								setSelectedTags={setSelectedTags}
							/>
						</div>
					</div>

				</div>
				: "Loading"}

		</>
	)
}

