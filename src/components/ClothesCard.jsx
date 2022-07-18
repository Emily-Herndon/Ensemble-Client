import React from "react"
import ShowImg from "./ShowImg"

export default function ShowClothes({ clothing, handleEditClothesClick, handleDeleteClothesClick }) {
	

	return (
		<div
			className="border rounded-xl h-[400px] w-[300px]"
		>
			<div
				className="h-[70%] flex justify-center"
			>

			<img
				className="object-contain" 
				src={clothing.imageId.imgUrl} 
				alt={clothing.clothesName} />
			</div>
			{clothing.clothesName} {clothing.status}
			<button
				className="rounded-lg text-pink-500 font-semibold p-2 bg-pink-200 hover:bg-pink-300 my-8"
				type="button"
				onClick={() => handleEditClothesClick(clothing)}
			>
				Edit
			</button>
			<button
				className="rounded-lg text-white font-semibold p-2 bg-red-600 hover:bg-red-700 my-8"
				type="button"
				onClick={() => handleDeleteClothesClick(clothing)}
			>
				Delete
			</button>
		</div>
	)
}
