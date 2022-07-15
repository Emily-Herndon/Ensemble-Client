import {useState} from 'react'
import NewClothes from './NewClothes'

export default function Profile({clothes, clothesForm, setClothesForm}) {
	const [msg, setMsg] = useState('')
	
	const handleNewClothesSubmit = async e => {
		e.preventDefault()
		try {
			
		} catch (err) {
			console.warn(err)
			if (err.response) {
				if (err.response.status === 400) {
					setMsg(err.response.data.msg)
				}
			}
		}
	}

	// const priority = {
	// 	top:1,
	// 	bottom:2,
	// 	shoes: 3
	// }
	// const sortedClothes = [...clothes].sort((a, b) => priority[b.category] > priority[a.category] ? 1 : -1)
	// 	.map((clothing) =>{

	// 	})

	
  return (
	<div className='content-center'>
		<div>Profile hi</div>

		<NewClothes 
		handleSubmit={handleNewClothesSubmit}
		clothesForm={clothesForm}
		setClothesForm={setClothesForm}
		/>

		
	</div>
  )
}

