import {useState, useEffect} from "react"
import axios from "axios"

export default function FileUploader({imgId,setImgId}) {
	const [imgFile, setImgFile] = useState(null)
	const [selectedFile, setSelectedFile] = useState(undefined)
    const [preview, setPreview] = useState(undefined)

	// useEffect to render image preview
	useEffect(()=>{
		// resets preview to undefined if there is no file selected
		if (!selectedFile) {
            setPreview(undefined)
            return
        }
		// creates object URL to be set using selected file
		const objURL = URL.createObjectURL(selectedFile)
		// sets preview with object URL for image
		setPreview(objURL)
		//revokes URL on unmount
		return () => URL.revokeObjectURL(objURL)
	},[selectedFile])

	// handles file input / image selection
	const handleFileInput = async (e) => {
		// if there is no file in e or if the target file length is 0, set selected file to undefined and return
			if (!e.target.files || e.target.files.length === 0) {
				setSelectedFile(undefined)
				return
			}
			console.log(e.target.files[0])
			//sets selected file with the file selected
			setSelectedFile(e.target.files[0])
			console.log("input completed?")
		}

	// handles sending image file to the server
	const handleImageSubmit = async e => {
		e.preventDefault()
		console.log("submit image")
		// creates new empty formData Object
		const fd = new FormData()
		fd.append("image", imgFile)

		// axios.post to send image to backend server

	}
	
	return (
		<div
		className="max-h-[200px] border"
		>
			FileUploader
			{/* image preview */}
			<div
			className=""
			>
				{selectedFile 
				&& 
				<img src={preview} className="object-fill max-h-[100px]"/>
				// <img src={preview} className={`object-contain h-[10px] w-[10px]`}/>
				}
			</div>

			{/* multi-part form for file upload */}
			{/* <form
				onSubmit={handleImageSubmit}
				encType="multipart/form"
				className="border"
			> */}
				{/* file upload input */}
				<label htmlFor='image' hidden>Upload an Image</label>
                <input
                    // no value on this controlled form
                    type="file"
                    id="image"
					className="max-h-[50px]"
					onInput={e => {
						handleFileInput(e)
					}}
                />

				{/* submit input */}
				{/* <input 
                className="border-2 border-slate-200"
                type='submit' />

			</form> */}
		</div>
	)
}