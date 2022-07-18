import React from "react"
import ShowImg from "./ShowImg"

export default function ShowClothes({ clothing, handleEditClothesClick, handleDeleteClothesClick }) {
	

	return (
		<div
			className="border-2 border-gray-300 rounded-xl h-[400px] w-[300px] bg-white"
		>
			<div
				className="h-[70%] flex justify-center"
			>

			<img
				className="object-contain" 
				src={clothing.imageId.imgUrl} 
				alt={clothing.clothesName} />
			</div>
			<div className="text-gray-500 font-semibold">
			{clothing.clothesName} 
			</div>
			<div className="text-gray-500 font-semibold">
			Status: {clothing.status}
			</div>
			<button
				className="rounded-lg text-white font-semibold p-2 bg-gray-400 hover:bg-gray-500 my-8"
				type="button"
				onClick={() => handleEditClothesClick(clothing)}
			>
				Edit
			</button>
			<button
				className="rounded-lg text-white font-semibold p-2 bg-gray-600 hover:bg-black my-8"
				type="button"
				onClick={() => handleDeleteClothesClick(clothing)}
			>
				Delete
			</button>
		</div>
	)
}
