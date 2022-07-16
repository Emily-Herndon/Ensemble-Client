import {useState,useEffect} from 'react'
import FileUploader from '../FileUploader'

export default function NewClothes({handleSubmit, clothesForm, setClothesForm}) {
	const [clothingModal, setClothingModal] = useState(false)
	const [imgFile, setImgFile] = useState(null)

	useEffect(()=>{
		setClothesForm({...clothesForm, imageFile: imgFile})
	},[imgFile])

	const handleStatusChange = e => {
		setClothesForm({...clothesForm, status: e.target.value})
	}

	const handleCategoryChange = e => {
		setClothesForm({...clothesForm, category: e.target.value})
	}

	return (
		<>
			{/* <!-- Modal toggle --> */}
			<div className='flex justify-center'>
				<button className="rounded-lg text-pink-500 font-semibold p-2 bg-pink-200 hover:bg-pink-300 my-8" type="button" data-modal-toggle="clothing-modal" onClick={()=>setClothingModal(true)}>
				Add Clothing Item
				</button>
			</div>
			{clothingModal ? 

			<div>
				{/* <!-- Main modal --> */}
				<div id="clothing-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
					<div className="relative p-4 w-full max-w-md h-full md:h-auto">
					{/* <!-- Modal content --> */}
						{/* close modal button container */}
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							{/* close modal button */}
							<button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="clothing-modal"onClick={()=>setClothingModal(false)}>
								<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-darkreader-inline-fill="" ><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
								<span className="sr-only">Close modal</span>
							</button>
							{/* form container */}
							<div className="py-6 px-6 lg:px-8">
								<h3 className="mb-4 text-xl font-medium text-pink-500">Add a Clothing Item</h3>
								
								{/* form */}
								<form
									encType='multipart/form' 
									className="space-y-6" 
									action="#"
									onSubmit={(e) => handleSubmit(e)}
								>
									<div>
										<label htmlFor="clothesName" className="block mb-2 text-pink-500 font-semibold">Name:</label>
										<input type="text" 
											name="clothesName" 
											id="clothesName" 
											value={clothesForm.clothesName}
											onChange={e => setClothesForm({...clothesForm, clothesName: e.target.value})}
											className="border-2 rounded border-pink-400 text-pink-500 block w-full p-2.5 placeholder-pink-400 focus:ring-pink-500" 
											placeholder="Clothes Name" 
											required/>
									</div>
									<div>
										<p className='font-semibold text-pink-500'>Category:</p>

										{/* input for top */}
										<input
											className='border-2 border-pink-400 focus:text-pink-400 focus:ring-pink-400'
											id="top"
											type="radio"
											name="category"
											value="top"
											onChange={e => handleCategoryChange(e)}
										/>
										<label htmlFor="top" className='mr-4 text-pink-500'>Top</label>
										
										{/* input for bottoms */}
										<input
											className='border-2 border-pink-400 focus:text-pink-400 focus:ring-pink-400'
											id="bottom"
											type="radio"
											name="category"
											value="bottom"
											onChange={e => handleCategoryChange(e)}
										/>
										<label htmlFor="bottom" className='mr-4 text-pink-500'>Bottom</label>

										{/* input for one piece */}
										<input
											className='border-2 border-pink-400 focus:text-pink-400 focus:ring-pink-400'
											id="onePiece"
											type="radio"
											name="category"
											value="onePiece"
											onChange={e => handleCategoryChange(e)}
										/>
										<label htmlFor="onePiece" className='mr-4 text-pink-500'>One-Piece</label>

										{/* input for shoes */}
										<input
											className='border-2 border-pink-400 focus:text-pink-400 focus:ring-pink-400'
											id="shoes"
											type="radio"
											name="category"
											value="shoes"
											onChange={e => handleCategoryChange(e)}
										/>
										<label htmlFor="shoes" className='mr-4 text-pink-500'>Shoes</label>
									</div>
									<div>
										<p className='font-semibold text-pink-500'>Status:</p>
										{/* input for clean */}
										<input
											className='border-2 border-pink-400 focus:text-pink-400 focus:ring-pink-400'
											id="clean"
											type="radio"
											name="status"
											value="clean"
											onChange={e => handleStatusChange(e)}
										/>
										<label htmlFor="clean" className='mr-4 text-pink-500'>Clean</label>

										{/* input for dirty */}
										<input
											className='border-2 border-pink-400 focus:text-pink-400 focus:ring-pink-400'
											id="dirty"
											type="radio"
											name="status"
											value="dirty"
											onChange={e => handleStatusChange(e)}
										/>
										<label htmlFor="dirty" className='mr-4 text-pink-500'>Dirty</label>

										{/* input for needs repair */}
										<input
											className='border-2 border-pink-400 focus:text-pink-400 focus:ring-pink-400'
											id="needsRepair"
											type="radio"
											name="status"
											value="needsRepair"
											onChange={e => handleStatusChange(e)}
										/>
										<label htmlFor="needsRepair" className='mr-4 text-pink-500'>Needs Repair</label>
										<div className='border-2 rounded border-pink-500 m-4 text-pink-500 font-semibold'>
										<FileUploader 
											setImgFile = {setImgFile}
										/>
										</div>
									</div>
										
									<button type="submit" className="rounded-lg text-pink-500 font-semibold p-2 bg-pink-200 hover:bg-pink-300 my-8" >Submit</button>
										
								</form>
							</div>
						</div>
					</div>
				</div> 
			</div>
				:
				""
			}

	</>
	)
}
