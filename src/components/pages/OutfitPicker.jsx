import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import OutfitCard from '../OutfitCard';
import OutfitPreview from '../OutfitPreview';

export default function OutfitPicker({ clothes }) {
	const [tops, setTops] = useState([])
	const [bottoms, setBottoms] = useState([])
	const [onePieces, setOnePieces] = useState([])
	const [shoes, setShoes] = useState([])
	const [accessories, setAccessories] = useState([])
	const [selectedTop, setSelectedTop] = useState({})
	const [outfit, setOutfit] = useState({
		top: null,
		bottom: null,
		shoes: null
	})

	const handleSelectClothing = (clothing, catVal) => {
		console.log("clickity clackity do")
		if (catVal === 'top') {
			setOutfit({ ...outfit, top: clothing })
			// setTops(clothing)
		} else if (catVal === 'bottom') {
			setOutfit({ ...outfit, bottom: clothing })
		} else if (catVal === 'shoes') {
			setOutfit({ ...outfit, shoes: clothing })
		}
		console.log(outfit)
	}
	// const filteredTops = clothesFilterFunction(clothes,"top")
	// console.log("filteredTops",filteredTops)
	const filteredTops = clothes.filter((clothing) => {
		return clothing.category === 'top'
	}).map((clothing) => {
		return (
			<div
				key={clothing._id}
				onClick={() => { handleSelectClothing(clothing, "top") }}
				className='w-[20vw] h[20vh]'
			>
				<OutfitCard
					clothing={clothing}
				/>
				{/* <img src={clothing.imageId.imgUrl}/> */}
			</div>
		)
	})

	const filteredBottoms = clothes.filter((clothing) => {
		return clothing.category === 'bottom'
	}).map((clothing) => {
		return (
			<div
				key={clothing._id}
				onClick={() => { handleSelectClothing(clothing, "bottom") }}
				className="w-[20vw] h[20vh]"
			>
				<OutfitCard
					clothing={clothing}
				/>
			</div>
		)
	})


	const filteredShoes = clothes.filter((clothing) => {
		return clothing.category === 'shoes'
	}).map((clothing) => {
		return (
			<div
				key={clothing._id}
				onClick={() => { handleSelectClothing(clothing, "shoes") }}
				className="w-[20vw] h[20vh]"
			>
				<OutfitCard
					clothing={clothing}
				/>
			</div>
		)
	})

	// const filteredOnePiece = clothes.filter((clothing) => {
	// 	return clothing.category === 'one piece'
	// }).map((clothing) => {
	// 	return (
	// 		<>
	// 			<OutfitCard
	// 				clothing={clothing}
	// 			/>
	// 		</>
	// 	)
	// })

	// const filteredAccessories= clothes.filter((clothing) => {
	// 	return clothing.category === 'accessories'
	// }).map((clothing) => {
	// 	return (
	// 		<>
	// 			<OutfitCard
	// 				clothing={clothing}
	// 			/>
	// 		</>
	// 	)
	// })


	return (
		<div>
			OutfitPicker
			<div
				className='flex justify-center'
			>
			<div>
				<OutfitPreview
					outfit={outfit}
					setOutfit = {setOutfit}
				/>
				<p>fuck this shittttt</p>
			</div>
			<div
				className="flex flex-col items-center"
			>
				<div
					className="w-[20vw] h[20vh] "
				>
					<Carousel
						showThumbs={false}
						infiniteLoop={true}
						showStatus={false}
						showArrows={true}
						emulateTouch={true}
					>
						{filteredTops}
					</Carousel>
				</div>
				<div
					className="w-[20vw] h[20vh]"
				>
					<Carousel
						showThumbs={false}
						infiniteLoop={true}
						showStatus={false}
						showArrows={true}
						emulateTouch={true}
					>

						{filteredBottoms}
					</Carousel>
				</div>
				<div
					className="w-[20vw] h[20vh]"
				>
					<Carousel
						showThumbs={false}
						infiniteLoop={true}
						showStatus={false}
						showArrows={true}
						emulateTouch={true}
					>
						{filteredShoes}
					</Carousel>
				</div>
			</div>
			</div>
		</div>
	)
}
