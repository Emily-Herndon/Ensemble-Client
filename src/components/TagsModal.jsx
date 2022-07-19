import { useState, useEffect } from "react"
import jwt_decode from "jwt-decode"
import axios from "axios"

export default function TagsModal({ setTagModal, handleSubmit, handleEditTagsSubmit, tagForm, setTagForm, tags, selectedTags, setSelectedTags, handleDeleteTag }) {
    
    useEffect(()=>{
        const getUser = async () =>{
            const token = localStorage.getItem('jwt')
            const decoded = jwt_decode(token)
            // const axiosUserTags = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile/${decoded.userName}`)
            // console.log("herrrooooo")
            // console.log("tags",tags)
        }
        getUser()
    },[])


    const closeTagClick = () => {
        setTagModal(false)
    }

    const buttonStyle = "place-items-center m-2 text-[8px] border-2 border-b-black border-l-black border-t-white border-r-white w-[78px] h-[35px] text-black m-2 font-press-start font-light bg-gray-200 p-2 hover:border-dotted my-8  dark:font-sans dark:text-white dark:bg-slate-800 dark:border-solid dark:border-slate-800 dark:hover:bg-slate-700 dark:rounded-lg dark:text-[14px] dark:h-[45px] dark:w-[130px] dark:font-bold"
    const inputStyle = "border-2 border-black text-black font-press-start text-[12px] p-2 placeholder-gray-400 w-[200px] dark:rounded-lg dark:border-2 dark:border-slate-800 dark:font-sans dark:text-slate-800 dark:text-[15px]"

    const allTags = tags.map((mappedTag, i) =>{
        // console.log(mappedTag)
        return(
            <div key={mappedTag._id}>
                <input type="checkbox" name="tagName" id="tagName" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800" checked={selectedTags.some((tag) => tag._id === mappedTag._id)} value={mappedTag._id} onChange={e => handleCheckbox(e, mappedTag) } />
                <label htmlFor="tagName" className="text-black font-press-start text-[12px] p-2 placeholder-gray-400 w-[200px] dark:font-sans dark:text-[16px] dark:text-white dark:font-bold dark:border-slate-700 dark:m-2">{mappedTag.tagName}</label> 
                <button
				className="dark:bg-slate-800 dark:border-2 dark:border-slate-800 dark:p-1 dark:rounded-lg dark:hover:bg-slate-600 dark:h-[34px] dark:m-1 m-2 border-2 p-2 text-[8px] bg-gray-200 border-l-black  border-b-black"
				type="button"
				onClick={(e) => handleDeleteTag(e, mappedTag)}
			>
				Delete
			</button>      
            </div>
        )
    })

    const handleCheckbox = (e, tag) =>{
        // map through checked tags and return their ids
        const selectedTagsIds = selectedTags.map(tag => {
            return tag._id  
        })
        // if you check a tag & it isn't already in selectedTags, add it
        if(e.target.checked && !selectedTags.some((tag) => tag._id === e.target.value)){
            // add a tag that has an id that matches the value of the checkbox to selectedTags
            setSelectedTags([...selectedTags, tags.find(tag => tag._id === e.target.value)]) 
        // if you uncheck a tag & it is in selectedTags remove it
        }else if(!e.target.checked && selectedTags.some((tag) => tag._id === e.target.value)) {
            // find the index of specific tag
            const idx = selectedTagsIds.indexOf(e.target.value)
            // make a copy of selectedTags
            const selectedTagsCopy = [...selectedTags]
            // remove the tag at found index
            selectedTagsCopy.splice(idx, 1)
            // set selectedTags to the updated selectedTagsCopy
            setSelectedTags(selectedTagsCopy)
        }

    }

    

    return (
        <>
            <div id="tag-create-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="tag-create-modal" onClick={() => closeTagClick()}>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="py-6 px-6 lg:px-8">
                        <div className="py-6 px-6 lg:px-8">
                            <h3 className="text-1xl text-black font-press-start p-6 dark:font-sans dark:text-2xl dark:text-white dark:font-bold">Tags:</h3>
                            <form className="text-1xl text-black font-press-start p-6 dark:font-sans dark:text-[16px] dark:text-white dark:font-bold" action="#" onSubmit={(e) => handleEditTagsSubmit(e, selectedTags)}>
                                {allTags}
                                <button type="submit" className={buttonStyle}>Add Tag</button>
                            </form>
                        </div>
                            <h3 className="text-1xl text-black font-press-start p-4 dark:font-sans dark:text-2xl dark:text-white dark:font-bold">Create a New Tag:</h3>
                            <form className="space-y-6" action="#" onSubmit={(e) => handleSubmit(e, tagForm)}>
                                <div>
                                    <label htmlFor="tagName" className="flex justify-center h-[23px] text-1xl text-black font-press-start p-6 dark:font-sans dark:text-2xl dark:text-white dark:font-bold"></label>
                                    <input type="text" name="tagName" id="tagName" className={inputStyle} value={tagForm.tagName} placeholder="Black Tie" onChange={e => setTagForm({ ...tagForm, tagName: e.target.value })} required />
                                </div>
                                <button type="submit" className={buttonStyle}>Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
