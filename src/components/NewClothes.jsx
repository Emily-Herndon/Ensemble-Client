import { useState, useEffect } from 'react'
import FileUploader from './FileUploader'

export default function NewClothes({ handleSubmit, clothesForm, setClothesForm, setClothingModal, setClothing, clothing, editOrAdd}) {

	const [imgFile, setImgFile] = useState(null)
	// console.log("clothesForm",clothesForm)

	const closeModal = () => {
		setClothingModal(false)
		setClothesForm({
			clothesName: '',
			category: 'default',
			status: 'Clean',
			imageFile: '',
			user: ''
		})
	}

	useEffect(() => {
		setClothesForm({ ...clothesForm, imageFile: imgFile })
	}, [imgFile])

	const handleStatusChange = e => {
		// console.log(e.target.value)
		setClothesForm({ ...clothesForm, status: e.target.value })
	}

	const handleCategoryChange = e => {
		setClothesForm({ ...clothesForm, category: e.target.value })
	}

	const buttonStyle = "place-items-center m-2 text-[8px] border-2 border-black w-[80px] h-[40px] text-black m-2 font-press-start font-light p-2 bg-#c0c0c0 hover:border-dotted my-8 dark:font-sans dark:text-white dark:bg-slate-800 dark:border-solid dark:border-slate-800 dark:hover:bg-slate-700 dark:rounded-lg dark:text-[14px] dark:h-[35px] dark:font-bold"
    const inputStyle = "border-2 border-black text-black font-press-start text-[12px] p-2 placeholder-gray-400 w-[200px] dark:rounded-lg dark:border-2 dark:border-slate-800 dark:font-sans dark:text-slate-800 dark:text-[15px]"

	return (
		<>
			<div>
				{/* <!-- Main modal --> */}
				<div id="clothing-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog" 
				>
					<div className="relative p-4 w-full max-w-md h-full md:h-auto">
						{/* <!-- Modal content --> */}
						{/* close modal button container */}
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700" >
							{/* close modal button */}
							<button type="button" className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="clothing-modal" onClick={() => closeModal()}>
								<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-darkreader-inline-fill="" ><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
								<span className="sr-only">Close modal</span>
							</button>
							{/* form container */}
							<div className="py-6 px-6 lg:px-8">
								<h3 className="text-1xl block mb-2 text-black font-press-start pb-4 dark:font-sans dark:text-2xl dark:text-white dark:font-bold">{editOrAdd === "edit" ? "Edit Clothing Item" : "Add Clothing Item"}</h3>

								{/* form */}
								<form
									encType='multipart/form'
									className="space-y-6"
									action="#"
									onSubmit={(e) => handleSubmit(e)}
								>
									<div>
										<label htmlFor="clothesName" className="text-1xl block mb-2 text-black font-press-start pb-4 dark:font-sans dark:text-2xl dark:text-white dark:font-bold"></label>
										<input type="text"
											name="clothesName"
											id="clothesName"
											value={clothesForm.clothesName}
											onChange={e => setClothesForm({ ...clothesForm, clothesName: e.target.value })}
											className={inputStyle}
											placeholder="Clothes Name"
											required />
									</div>
									<div>
										<label htmlFor="category" className="font-semibold text-black"></label>
										<select id="category" className={inputStyle}
											onChange={e => handleCategoryChange(e)}
											defaultValue={clothesForm.category}
											required
										>
											<option hidden value='default'>Category</option>
											<option value='top'>Top</option>
											<option value='bottom'>Bottom</option>
											<option value='onePiece'>One Piece</option>
											<option value='shoes'>Shoes</option>
										</select>
									</div>
									<div>
										<label htmlFor="status" className="font-semibold text-pink-500"></label>
										<select id="status"
											className={inputStyle}
											onChange={e => handleStatusChange(e)}
											defaultValue={clothesForm.status}
											required
										>
											{/* <option className='border-2 border-pink-400 focus:text-pink-400 focus:ring-pink-400' {clothesForm.status == value ? selected : ""} value='clean'>Clean</option> */}
											<option hidden value='default'>Status</option>
											<option value='Clean'>Clean</option>
											<option value='Dirty'>Dirty</option>
											<option value='Needs-Repair'>Needs Repair</option>
										</select>

										<div className='flex justify-center border-2 border-black m-4 text-black font-semibold dark:border-slate-700'>
											{
												clothesForm.imageId
												? 
												<img
												className="w-auto h-[200px]"
												src={clothesForm.imageId.imgUrl}/>
												:
												<FileUploader
													setImgFile={setImgFile}
												/>

											}

											{/* <FileUploader
												setImgFile={setImgFile}
											/> */}


										</div>
									</div>

									<button type="submit" className={buttonStyle} >{editOrAdd === "edit" ? "Edit" : "Add"}</button>

								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
