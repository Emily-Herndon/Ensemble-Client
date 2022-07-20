import React from 'react'
import { FaTshirt } from "react-icons/fa"
import { GiShorts, GiConverseShoe } from "react-icons/gi"

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

    const buttonStyle = "dark:pb-10 m-2 text-[8px] border-2 border-b-black border-l-black border-t-white border-r-white w-[80px] h-[40px] text-black font-press-start font-light p-2 bg-#c0c0c0 hover:border-dotted dark:font-sans dark:text-white dark:bg-slate-800 dark:border-solid dark:border-slate-800 dark:hover:bg-slate-700 dark:rounded-lg dark:text-[14px] dark:h-[28px] dark:font-bold"
    const inputStyle = " border-2 border-black text-black font-press-start text-[12px] p-2 placeholder-gray-400 w-[200px] h-[40px] dark:rounded-lg dark:border-2 dark:border-slate-800 dark:font-sans dark:text-slate-800 dark:text-[15px]"
    const height = 250
    const width = 250
    return (
        <div>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col mt-[5rem] justify-center items-center border px-10 rounded-xl"
            >
                <div
                className='flex justify-center items-center'
                >
                    <input
                        className={inputStyle}
                        type='text'
                        placeholder='Outfit Name'
                        value={outfit.outfitName}
                        onChange={(e) => setOutfit({ ...outfit, outfitName: e.target.value })}
                    />

                    <button className={buttonStyle} type='submit'>Submit</button>
                </div>
                <div
                    className="max-w-[350px] h-auto mt-3 my-2"
                >
                    {
                        outfit.top ?
                            <img
                                src={topPreview}
                                className="h-[160px] w-[160px] object-contain"
                            />
                            :
                            <FaTshirt
                                size={150}
                            />
                    }
                </div>

                <div
                    className="max-w-[250px] h-auto flex my-2"
                >
                    {
                        outfit.bottom ?

                            <img
                                src={bottomPreview}
                                className="h-[160px] w-[160px] object-contain"
                            />
                            :
                            <GiShorts
                                size={150}
                            />
                    }
                </div>

                <div
                    className="max-w-[250px] h-auto flex my-2"
                >
                    {outfit.shoes ?

                        <img
                            src={shoesPreview}
                            className="h-[160px] w-[160px] object-contain"
                        />
                        :
                        <GiConverseShoe
                            size={150}
                        />
                    }
                </div>
                
            </form>
        </div>
    )
}
