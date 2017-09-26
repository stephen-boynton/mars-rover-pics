import React, { Component } from "react";
import axios from "axios";
import GetImageButton from "./GetImageButton";
import ImageDisplay from "./ImageDisplay";
import "../styles/GettingImageForm.css";
const API_KEY = "0WeT0HBksGb8nLegUUZFbHqmi4a1lau2QtXhH2nw";

export default class GetImageForm extends Component {
	constructor() {
		super();
		this.state = {
			rover: "Curiosity",
			camera: "FHAZ",
			images: [],
			sol: ""
		};
	}

	_fetchRoverImages = e => {
		e.preventDefault();
		console.log(this.state);
		const cam = this.state.camera;
		const rove = this.state.rover;
		const num = this.state.sol;

		const imageUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rove}/photos?sol=${num}&camera=${cam}&api_key=${API_KEY}`;

		axios.get(imageUrl).then(data => {
			console.log(data);
			this.setState({
				images: data.data.photos
			});
		});
	};

	_handleCamera = e => {
		console.log(e);
		this.setState({
			camera: e.target.value
		});
	};

	_handleRover = e => {
		console.log(e);
		this.setState({
			rover: e.target.value
		});
	};

	_handleSol = e => {
		console.log(e);
		this.setState({
			sol: e.target.value
		});
	};
	render() {
		return (
			<div className="getImage">
				<h1>MARS</h1>
				<label htmlFor="rover">Rover:</label>
				<select
					onChange={this._handleRover}
					id="rover"
					value={this.state.value}
				>
					<option value="Curiosity">Curiosity</option>
					<option value="Opportunity">Opportunity</option>
					<option value="Spirit">Spirt</option>
				</select>
				<label htmlFor="camera">Camera Type:</label>
				<select
					onChange={this._handleCamera}
					id="rover"
					value={this.state.value}
				>
					<option value="fhaz">FHAZ (Front Hazard)</option>
					<option value="rhaz">RHAZ (Rear Hazard)</option>
					<option value="navcam">NAVCAM (Navigation Cam)</option>
				</select>
				<label htmlFor="sol">Martian Sol: 1000-2000</label>
				<input
					type="number"
					onChange={this._handleSol}
					max="2000"
					min="1000"
					value={this.state.value}
				/>
				<GetImageButton onClick={this._fetchRoverImages} />
				{this.state.images.map(photo => {
					return <ImageDisplay key={photo.id} photos={photo.img_src} />;
				})}
			</div>
		);
	}
}
