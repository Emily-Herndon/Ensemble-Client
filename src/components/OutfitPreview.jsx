import React from 'react'

export default function OutfitPreview({ outfit, setOutfit, handleSubmit }) {

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
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Outfit Name</label>
                <input
                    type='text'
                    placeholder='outfit Name'
                    value={outfit.outfitName}
                    onChange={(e) => setOutfit({ ...outfit, outfitName: e.target.value })}
                />
                <div className='bg-black'>
                    <img src={topPreview} />
                </div>

                <div>
                    <img src={bottomPreview} />
                </div>

                <div>
                    <img src={shoesPreview} />
                </div>

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
