import React from "react"

export default function(props) {
	const randomTrinket = () => {
		const randomId = Math.floor(Math.random() * props.items.length)
		props.history.push(`/trinket/${randomId}`)
	}

	return (
		<div>
			<h3>Welcome!</h3>
			<button onClick={randomTrinket}>Random Trinket</button>
		</div>
	)
}
