import React from "react"
import ShowImg from "./ShowImg"

export default function ShowClothes({ clothing, handleEditClothesClick, handleDeleteClothesClick }) {
	

	return (
		<div
			className="border-2 border-pink-400 rounded-xl h-[400px] w-[300px] bg-white"
		>
			<div
				className="h-[70%] flex justify-center"
			>

			<img
				className="object-contain" 
				src={clothing.imageId.imgUrl} 
				alt={clothing.clothesName} />
			</div>
			<div className="text-pink-500 font-semibold">
			{clothing.clothesName} 
			</div>
			<div className="text-pink-500 font-semibold">
			Status: {clothing.status}
			</div>
			<button
				className="rounded-lg text-pink-500 font-semibold p-2 bg-pink-200 hover:bg-pink-300 my-8"
				type="button"
				onClick={() => handleEditClothesClick(clothing)}
			>
				Edit
			</button>
			<button
				className="rounded-lg text-white font-semibold p-2 bg-pink-600 hover:bg-pink-700 my-8"
				type="button"
				onClick={() => handleDeleteClothesClick(clothing)}
			>
				Delete
			</button>
		</div>
	)
}
