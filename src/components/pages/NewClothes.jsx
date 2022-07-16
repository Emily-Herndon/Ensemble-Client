import { useState, useEffect } from 'react'
import FileUploader from '../FileUploader'

export default function NewClothes({ handleSubmit, clothesForm, setClothesForm, setClothingModal }) {

	const [imgFile, setImgFile] = useState(null)

	useEffect(() => {
		setClothesForm({ ...clothesForm, imageFile: imgFile })
	}, [imgFile])

	const handleStatusChange = e => {
		setClothesForm({ ...clothesForm, status: e.target.value })
	}

	const handleCategoryChange = e => {
		setClothesForm({ ...clothesForm, category: e.target.value })
	}

	return (
		<>
			<div>
				{/* <!-- Main modal --> */}
				<div id="clothing-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
					<div className="relative p-4 w-full max-w-md h-full md:h-auto">
						{/* <!-- Modal content --> */}
						{/* close modal button container */}
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							{/* close modal button */}
							<button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="clothing-modal" onClick={() => setClothingModal(false)}>
								<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-darkreader-inline-fill="" ><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
								<span className="sr-only">Close modal</span>
							</button>
							{/* form container */}
							<div className="py-6 px-6 lg:px-8">
								<h3 className="mb-4 text-xl font-medium text-pink-500">Add/Edit a Clothing Item</h3>

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
											onChange={e => setClothesForm({ ...clothesForm, clothesName: e.target.value })}
											className="border-2 rounded border-pink-400 text-pink-500 block w-full p-2.5 placeholder-pink-400 focus:ring-pink-500"
											placeholder="Clothes Name"
											required />
									</div>
									<div>
										<label for="category" className="font-semibold text-pink-500">Category:</label>
										<select id="category" className="border-pink-400 focus:text-pink-400 focus:ring-pink-400 block w-full p-2.5"
										onChange={e => handleCategoryChange(e)}
										>
											<option className='border-2 border-pink-400 focus:text-pink-400 focus:ring-pink-400' value='top'>Top</option>
											<option className='border-2 border-pink-400 focus:text-pink-400 focus:ring-pink-400' value='bottom'>Bottom</option>
											<option className='border-2 border-pink-400 focus:text-pink-400 focus:ring-pink-400' value='onePiece'>One Piece</option>
											<option className='border-2 border-pink-400 focus:text-pink-400 focus:ring-pink-400' value='shoes'>Shoes</option>
										</select>
									</div>
									<div>
										<label for="category" className="font-semibold text-pink-500">Status:</label>
										<select id="category" className="border-pink-400 focus:text-pink-400 focus:ring-pink-400 block w-full p-2.5"
										onChange={e => handleStatusChange(e)}
										>
											<option className='border-2 border-pink-400 focus:text-pink-400 focus:ring-pink-400' value='clean'>Clean</option>
											<option className='border-2 border-pink-400 focus:text-pink-400 focus:ring-pink-400' value='dirty'>Dirty</option>
											<option className='border-2 border-pink-400 focus:text-pink-400 focus:ring-pink-400' value='needsRepair'>Needs Repair</option>
										</select>
				
										<div className='border-2 rounded border-pink-500 m-4 text-pink-500 font-semibold'>
											<FileUploader
												setImgFile={setImgFile}
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
		</>
	)
}
