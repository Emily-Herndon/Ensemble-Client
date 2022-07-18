import React, { Component, useState } from 'react';
import ReactDOM  from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function OutfitPicker({ clothes }) {
	const [tops, setTops] = useState([])
	const [bottoms, setBottoms] = useState([])
	const [onePieces, setOnePieces] = useState([])
	const [shoes, setShoes] = useState([])
	const [accessories, setAccessories] = useState([])


	const carousel = () => {

		clothes.filter(clothing => {
			   if(clothing.category === 'top'){
				   setTops(clothing)
			   }else if(clothing.category === 'bottom'){
				   setBottoms(clothing)
			   } else if (clothing.category === 'shoes'){
				   setShoes(clothing)
			   } else if (clothing.category === 'one piece') {
				   setOnePieces(clothing)
			   } else if (clothing.category === 'accessories') {
				   setAccessories(clothing)
			   }
	   })
	}
		carousel()
	

	const topMap = tops.map(top => {
		return (
			<div>
				<img src= {top.imageId.imgUrl}/>
				<p> {top.clothesName} </p>
			</div>
		)
	})
	return (
		<div>
			OutfitPicker
			<Carousel>
				{topMap}
		    </Carousel>
		</div>
	)
}
// ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'));


{/* <div key={clothing._id}>
	if (selectCat == "top") { 
			const filteredTops = clothes.filter((clothes) => {
				return clothes.category.includes("top")
			})
	setShowCat(filteredTops)
		} else if (selectCat == "bottom") {
			const filteredBottoms = clothes.filter((clothes) => {
				return clothes.category.includes("bottom")
			})
	setShowCat(filteredBottoms)
		} else if (selectCat == "onePiece") {
			const filteredOnePiece = clothes.filter((clothes) => {
				return clothes.category.includes("onePiece")
			})
	setShowCat(filteredOnePiece)
		} else if (selectCat == "shoes") {
			const filteredShoes = clothes.filter((clothes) => {
				return clothes.category.includes("shoes")
			})
	setShowCat(filteredShoes)
		} else if (selectCat == "accessory") {
			const filteredAccess = clothes.filter((clothes) => {
				return clothes.category.includes("accessory")
			})
	setShowCat(filteredAccess)
		} else if (selectCat == "all") {
			const sortedAllClothes = clothes.sort((a, b) => priority[b.category] > priority[a.category] ? -1 : 1)
	setShowCat(sortedAllClothes)
		} */}