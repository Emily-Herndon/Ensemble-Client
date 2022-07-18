import React from 'react'
import ClothesCard from "./ClothesCard"

export default function ShowClothingCards({clothes, handleEditClothesClick, handleDeleteClothesClick}) {
  const mapClothes = clothes.map((clothing)=>{
    return (
      <div key={clothing._id}>
        <ClothesCard
          clothing={clothing}
          handleEditClothesClick={handleEditClothesClick}
          handleDeleteClothesClick={handleDeleteClothesClick}
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
