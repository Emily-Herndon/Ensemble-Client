import React from 'react'
import ClothesCard from "./ClothesCard"

export default function ShowClothingCards({clothes, handleEditClothesClick, handleDeleteClothesClick}) {
  const mapClothes = clothes.map((clothing)=>{
    return (
      <>
        <ClothesCard
          key={`${clothing._id}`}
          clothing={clothing}
          handleEditClothesClick={handleEditClothesClick}
          handleDeleteClothesClick={handleDeleteClothesClick}
        />
      </>
    )
  })
  
  return (
    <>
      {mapClothes}
    </>
  )
}
