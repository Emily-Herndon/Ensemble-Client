import React from 'react'

export default function OutfitPreview({outfit, setOutfit, handleClick}) {
    
    let topPreview = ""
    if (outfit.top !== null) {
        topPreview = outfit.top.imageId.imgUrl
    } else {
        topPreview = ""
    }

    let bottomPreview = ""
    if (outfit.bottom !== null) {
        bottomPreview = outfit.bottom.imageId.imgUrl
    } else {
        bottomPreview = ""
    }

    let shoesPreview = ""
    if (outfit.shoes !== null) {
        shoesPreview = outfit.shoes.imageId.imgUrl
    } else {
        shoesPreview = ""
    }
  
    return (
    <div>
        <img src={topPreview}/>
        <img src={bottomPreview}/>
        <img src={shoesPreview}/>
        <button type='submit' onClick={() => handleClick()}>Submit</button>
    </div>
  )
}
