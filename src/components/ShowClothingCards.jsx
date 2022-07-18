import React from 'react'
import ClothesCard from "./ClothesCard"

export default function ShowClothingCards({clothes, handleEditClothesClick, handleDeleteClothesClick, handleAddTagsClick, selectedTags, setSelectedTags}) {
  const mapClothes = clothes.map((clothing)=>{
    return (
      <div key={clothing._id}>
        <ClothesCard
          clothing={clothing}
          handleEditClothesClick={handleEditClothesClick}
          handleDeleteClothesClick={handleDeleteClothesClick}
          handleAddTagsClick={handleAddTagsClick}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </div>
    )
  })
  
  return (
    <>
      {mapClothes}
    </>
  )
}
