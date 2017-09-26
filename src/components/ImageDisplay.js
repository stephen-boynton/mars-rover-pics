import React from "react";

export default function ImageDisplay(props) {
	return (
		<div className="pics">
			<img src={props.photos} alt="rover pic" />
		</div>
	);
}
