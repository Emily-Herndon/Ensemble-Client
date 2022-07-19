import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import OutfitCard from '../OutfitCard';
import OutfitPreview from '../OutfitPreview';
import axios from 'axios';

export default function OutfitPicker({ clothes, currentUser }) {
	const [tops, setTops] = useState([])
	const [bottoms, setBottoms] = useState([])
	const [onePieces, setOnePieces] = useState([])
	const [shoes, setShoes] = useState([])
	const [accessories, setAccessories] = useState([])
	const [selectedTop, setSelectedTop] = useState({})
	const [outfit, setOutfit] = useState({
		outfitName: '',
		top: null,
		bottom: null,
		shoes: null
	})

	

	const handleSelectClothing = async (clothing, catVal=null) => {
		
		// console.log("clickity clackity do")
		if (catVal === 'top') {
			setOutfit({ ...outfit, top: clothing })
			// setTops(clothing)
		} else if (catVal === 'bottom') {
			setOutfit({ ...outfit, bottom: clothing })
		} else if (catVal === 'shoes') {
			setOutfit({ ...outfit, shoes: clothing })
		}
		// console.log(outfit)
		// const OutfitResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/outfits`, outfit)
	}
	// console.log(outfit)

	const handleOutfitSubmit = async(e) =>{
		e.preventDefault()
		try {
			console.log('submitted')
			console.log(outfit)
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/outfits`, outfit)
			const userResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile/`)
			setOutfit({
				outfitName: '', 
				top: null,
				bottom: null,
				shoes: null
			})
			
		} catch (error) {
			console.warn(error)
		}

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
			<div className='bg-white'>
				<OutfitPreview
					outfit={outfit}
					setOutfit = {setOutfit}
					handleSubmit={handleOutfitSubmit}
					// handleSubmit={handleSelectClothing}
				/>
				
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
