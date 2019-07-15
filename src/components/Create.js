import React from "react"
import axios from "axios"

class Create extends React.Component {
	constructor() {
		super()
		this.state = {
			name: '',
			price: '',
			imageUrl: 'https://placedog.net/500',
			description: '',
			shipping: '',
			errorMessage: null
		}
	}

	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	createItem = (evt) => {
		evt.preventDefault()

		const { name, price, imageUrl, description, shipping } = this.state
		const payload = { name, price, imageUrl, description, shipping }
		
		axios.post("http://localhost:3333/items", payload)
			.then((response) => {
				this.setState({
					errorMessage: null
				})

				this.props.updateItems(response.data)
				this.props.history.push("/trinkets")
			})
			.catch((err) => {
				this.setState({
					errorMessage: err.response.data.error
				})
			})
	}

	render() {
		const { name, price, imageUrl, description, shipping, errorMessage } = this.state

		return (
			<form onSubmit={this.createItem}>
				<h1>Create New Trinket</h1>

				<p>{errorMessage}</p>

				<input type="text" name="name" placeholder="Name" value={name} onChange={this.handleChange} />
				<input type="text" name="price" placeholder="Price" value={price} onChange={this.handleChange} />
				<input type="text" name="imageUrl" placeholder="Image URL" value={imageUrl} onChange={this.handleChange} />
				<input type="text" name="description" placeholder="Description" value={description} onChange={this.handleChange} />
				<input type="text" name="shipping" placeholder="Shipping" value={shipping} onChange={this.handleChange} />

				<button type="submit">Create</button>
			</form>
		)
	}
}

export default Create