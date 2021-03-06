import React from "react"
import ShowImg from "./ShowImg"

export default function ShowClothes({ clothing, handleEditClothesClick, handleDeleteClothesClick, handleAddTagsClick, selectedTags, setSelectedTags }) {
	const buttonStyle = "dark:pb-5 pt-2 m-2 text-[7px] border-2 border-b-black border-l-black border-t-white border-r-white w-[78px] h-[35px] text-black m-2 font-press-start font-light bg-transparent p-2 hover:border-dotted my-8  dark:font-sans dark:text-white dark:bg-slate-800 dark:border-solid dark:border-slate-800 dark:hover:bg-slate-700 dark:rounded-lg dark:text-[10px] dark:font-bold"
	const clothingTags = clothing.tags.map((tag) => {
		return <span key={tag._id} className=" border border-1 border-b-black border-l-black border-t-white border-r-white h-[450px] w-[300px] bg-transparent dark:rounded-lg dark:border-slate-800 dark:border-1 dark:bg-slate-300 mx-1 px-0.5">{tag.tagName}</span>
	})

	return (
		<div
			className="border-4 border-b-black border-l-black border-t-white border-r-white h-[450px] w-[300px] bg-transparent dark:rounded-lg dark:border-slate-800 dark:border-4 dark:bg-slate-300"
		>
			<div
				className="h-[65%] flex justify-center"
			>

				<img
					className="object-contain"
					src={clothing.imageId.imgUrl}
					alt={clothing.clothesName} />
			</div>
			<div className="text-black font-press-start text-[12px] mb-2 dark:font-sans dark:text-[16px] dark:text-slate-800 dark:font-bold dark:mb-1">
				{clothing.clothesName}
			</div>
			<div className="text-black font-press-start text-[10px] dark:font-sans dark:text-[14px] dark:text-slate-800">
				Status: {clothing.status}
			</div>
			<div className="text-black font-press-start text-[10px] dark:font-sans dark:text-[14px] dark:text-slate-800">
				Tags: {clothingTags}
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
				Add Tags
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
