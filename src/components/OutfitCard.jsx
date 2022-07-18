import React from 'react'

export default function OutfitCard({clothing}) {
  return (
    <>
        <img 
            src={clothing.imageId.imgUrl}
        />
        <p> {clothing.clothesName} </p>
    </>
  )
}
