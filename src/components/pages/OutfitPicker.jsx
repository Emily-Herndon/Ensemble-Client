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



	const handleSelectClothing = async (clothing, catVal = null) => {

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

	const handleOutfitSubmit = async (e) => {
		e.preventDefault()

		try {
			console.log('submitted')
			console.log(outfit)
			const reqBody = {
				outfitName: outfit.outfitName,
				top: outfit.top,
				bottom: outfit.bottom,
				shoes: outfit.shoes,
				user: currentUser.id,
			}

			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/outfits`, reqBody)

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
				className=''
			>
				<OutfitCard
					clothing={clothing}
				/>
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
				className="object-cover"
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
				className="object-cover"
			>
				<OutfitCard
					clothing={clothing}
				/>
			</div>
		)
	})

	return (
		<div className='m-6 text-1xl text-black font-press-start mt-8 dark:font-sans dark:text-2xl dark:text-slate-800 dark:font-bold'>
			What are you going to wear today?
			<div
				className='flex justify-around'
			>
				<div
					className=''
				>

					<OutfitPreview
						outfit={outfit}
						setOutfit={setOutfit}
						handleSubmit={handleOutfitSubmit}
					// handleSubmit={handleSelectClothing}
					/>

				</div>
				
				<div
					className="mt-16"
				>
					<div
						className="my-2"
					>
						<Carousel
							showThumbs={false}
							infiniteLoop={true}
							showStatus={false}
							showArrows={true}
							width={150}
							height={150}
						>
							{filteredTops}
						</Carousel>
					</div>
					<div
						className="my-2"
					>
						<Carousel
							showThumbs={false}
							infiniteLoop={true}
							showStatus={false}
							showArrows={true}
							width={150}
							height={150}
						>

							{filteredBottoms}
						</Carousel>
					</div>
					<div
						className="my-2"
					>
						<Carousel
							showThumbs={false}
							infiniteLoop={true}
							showStatus={false}
							showArrows={true}
							width={150}
							height={250}

						>
							{filteredShoes}
						</Carousel>
					</div>
				</div>
			</div>
		</div>

	)
}
