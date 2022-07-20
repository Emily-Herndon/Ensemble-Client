import React from 'react'

export default function OutfitCard({clothing}) {
  return (
    <>
        <img 
            src={clothing.imageId.imgUrl}
            className="h-[250px] w-[150px] object-contain"
        />
        {/* <p> {clothing.clothesName} </p> */}
    </>
  )
}
