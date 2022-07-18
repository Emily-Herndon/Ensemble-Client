import React from "react"
import {Carousel} from 'react-responsive-carousel'

export default function OutfitPicker({clothes}) {
	console.log(clothes)
	const images = clothes.map(clothing => {
		return(
		<div>
			<img src= {clothing.imageId.imageUrl}/>
			<p>{clothing.name}</p>
		</div>

		)
	})
	return (
		<div>
			OutfitPicker
			{images}
		</div>
	)
}
