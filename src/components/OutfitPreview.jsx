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

    const buttonStyle = "m-2 text-[8px] border-2 border-b-black border-l-black border-t-white border-r-white w-[80px] h-[40px] text-black font-press-start font-light p-2 bg-#c0c0c0 hover:border-dotted dark:font-sans dark:text-white dark:bg-slate-800 dark:border-solid dark:border-slate-800 dark:hover:bg-slate-700 dark:rounded-lg dark:text-[14px] dark:h-[40px] dark:font-bold"
    const inputStyle = "mt-8 border-2 border-black text-black font-press-start text-[12px] p-2 placeholder-gray-400 w-[200px] h-[40px] dark:rounded-lg dark:border-2 dark:border-slate-800 dark:font-sans dark:text-slate-800 dark:text-[15px]"

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label></label>
                <input
                    className={inputStyle}
                    type='text'
                    placeholder='Outfit Name'
                    value={outfit.outfitName}
                    onChange={(e) => setOutfit({ ...outfit, outfitName: e.target.value })}
                />
               <br></br>
                <button className={buttonStyle} type='submit'>Submit</button>

                <div>
                    <img src={topPreview} />
                </div>

                <div>
                    <img src={bottomPreview} />
                </div>

                <div>
                    <img src={shoesPreview} />
                </div>
            </form>
        </div>
    )
}
