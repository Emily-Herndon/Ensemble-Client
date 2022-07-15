import {useState} from 'react'
import FileUploader from '../FileUploader'

export default function NewClothes({handleSubmit, clothesForm, setClothesForm}) {
	const [clothingModal, setClothingModal] = useState(false)

	return (
		<>
			{/* <!-- Modal toggle --> */}
			<div className='flex justify-center'>
				<button className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center" type="button" data-modal-toggle="clothing-modal" onClick={()=>setClothingModal(true)}>
				Add Clothing Item
				</button>
			</div>
			{clothingModal ? 

			<div>
			{/* <!-- Main modal --> */}
			<div id="clothing-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
				<div className="relative p-4 w-full max-w-md h-full md:h-auto">
					{/* <!-- Modal content --> */}
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="clothing-modal"onClick={()=>setClothingModal(false)}>
							<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-darkreader-inline-fill="" ><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
							<span className="sr-only">Close modal</span>
						</button>
						<div className="py-6 px-6 lg:px-8">
							<h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add a Clothing Item</h3>
							<form className="space-y-6" action="#">
								<div>
									<label htmlFor="clothesName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name:</label>
									<input type="text" 
									name="clothesName" 
									id="clothesName" 
									value={clothesForm.clothesName}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
									placeholder="Clothes Name" 
									required/>
								</div>
								<div>
								<p>Category:</p>
								<input
									id="top"
									type="radio"
									name="category"
									value={clothesForm.category}
								/>
								<label htmlFor="top">Top</label>
								<input
									id="bottom"
									type="radio"
									name="category"
									value={clothesForm.category}
								/>
								<label htmlFor="bottom">Bottom</label>
								<input
									id="onePiece"
									type="radio"
									name="category"
									value={clothesForm.category}
								/>
								<label htmlFor="onePiece">One-Piece</label>
								<input
									id="shoes"
									type="radio"
									name="category"
									value={clothesForm.category}
								/>
								<label htmlFor="shoes">Shoes</label>
							</div>
							<div>
								<p>Status:</p>
								<input
									id="clean"
									type="radio"
									name="status"
									value={clothesForm.status}
								/>
								<label htmlFor="clean">Clean</label>
								<input
									id="dirty"
									type="radio"
									name="status"
									value={clothesForm.status}
								/>
								<label htmlFor="dirty">Dirty</label>
								<input
									id="needsRepair"
									type="radio"
									name="status"
									value={clothesForm.status}
								/>
								<label htmlFor="needsRepair">Needs Repair</label>
								<FileUploader />
							</div>
								
								<button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onSubmit={(e) => handleSubmit}>Submit</button>
								
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
