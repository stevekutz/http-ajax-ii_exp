import React from "react"
import { Route, NavLink, Link } from "react-router-dom"
import Description from "./TrinketDescription"
import Shipping from "./TrinketShipping"

export default function(props) {
	const item = props.items.find(i => String(i.id) === props.match.params.id)

	if (!item) {
		return <div>Loading...</div>
	}

	return (
		<div className="item-wrapper">
			<div className="item-header">
				<div className="image-wrapper">
					<img src={item.imageUrl} alt={item.name} />
				</div>

				<div className="item-title-wrapper">
					<h2>{item.name}</h2>
					<h4>${item.price}</h4>
				</div>
			</div>

			<nav className="trinket-nav">
				<NavLink to={props.match.url} exact>Description</NavLink>
				<NavLink to={`${props.match.url}/shipping`} exact>Shipping</NavLink>
				<Link to={`/edit/${item.id}`}>Edit</Link>
			</nav>

			<Route path={props.match.path} exact render={() => <Description description={item.description} />} />
			<Route path={`${props.match.path}/shipping`} exact render={() => <Shipping shipping={item.shipping} />} />
		</div>
	)
}