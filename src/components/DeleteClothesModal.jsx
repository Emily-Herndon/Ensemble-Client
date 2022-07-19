import React from 'react'

export default function DeleteClothesModal({  setDeleteModal, handleClothingDelete, clothing }) {
    const closeDeleteModal = () => {
        setDeleteModal(false)
    }
    const buttonStyle = "text-[8px] border-2 border-b-black border-l-black border-t-white border-r-white w-[105px] h-[34px] text-black m-2 font-press-start font-light p-2 bg-gray-200 hover:border-dotted my-8"
    return (
        <>
            <div id="deleteClothingModal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="deleteClothingModal" onClick={() => closeDeleteModal()}>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center">
                            <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-black dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 className="text-[15px] text-black font-press-start p-6">Are you sure you want to delete this clothing item?</h3>
                            <button data-modal-toggle="deleteClothingModal" type="button" className={buttonStyle} onClick={e => handleClothingDelete(e, clothing)}>
                                Yes!
                            </button>
                            <button data-modal-toggle="deleteClothingModal" type="button" className={buttonStyle} onClick={() => closeDeleteModal()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
