import React from "react"
import ShowImg from "./ShowImg"

export default function ShowClothes({ clothing, handleEditClothesClick, handleDeleteClothesClick, handleAddTagsClick, selectedTags, setSelectedTags }) {
	const buttonStyle = "place-items-center m-2 text-[8px] border-2 border-b-black border-l-black border-t-white border-r-white w-[78px] h-[35px] text-black m-2 font-press-start font-light bg-gray-200 p-2 hover:border-dotted my-8"

	return (
		<div
			className="border-2 border-b-black border-l-black h-[400px] w-[300px] bg-white"
		>
			<div
				className="h-[65%] flex justify-center"
			>

			<img
				className="object-contain" 
				src={clothing.imageId.imgUrl} 
				alt={clothing.clothesName} />
			</div>
			<div className="text-black font-press-start text-[18px] mb-2">
			{clothing.clothesName} 
			</div>
			<div className="text-black font-press-start text-[12px]">
			Status: {clothing.status}
			</div>
			<button
				className={buttonStyle}
				type="button"
				onClick={() => handleEditClothesClick(clothing)}
			>
				Edit
			</button>
			<button
				className={buttonStyle}
				type="button"
				onClick={() => handleAddTagsClick(clothing)}
			>
				Add Tag
			</button>
			<button
				className={buttonStyle}
				type="button"
				onClick={() => handleDeleteClothesClick(clothing)}
			>
				Delete
			</button>
		</div>
	)
}
