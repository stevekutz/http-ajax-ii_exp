import React from "react"
import axios from "axios"

class Edit extends React.Component {
	constructor() {
		super()
		this.state = {
			name: '',
			price: '',
			imageUrl: '',
			description: '',
			shipping: '',
			errorMessage: null
		}
	}

	componentDidMount() {
		const id = this.props.match.params.id

		axios.get(`http://localhost:3333/items/${id}`)
			.then(response => {
				const { name, price, imageUrl, description, shipping } = response.data
				this.setState({ name, price, imageUrl, description, shipping })
			})
			.catch(err => {
				this.setState({
					errorMessage: err.response.data.error
				})
			})
	}

	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	updateItem = (evt) => {
		evt.preventDefault()

		const id = this.props.match.params.id
		const { name, price, imageUrl, description, shipping } = this.state
		const payload = { name, price, imageUrl, description, shipping }
		
		axios.put(`http://localhost:3333/items/${id}`, payload)
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

	deleteItem = (evt) => {
		evt.preventDefault()

		const id = this.props.match.params.id

		axios.delete(`http://localhost:3333/items/${id}`)
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
			<form onSubmit={this.updateItem}>
				<h1>Edit Trinket</h1>

				<p>{errorMessage}</p>

				<input type="text" name="name" placeholder="Name" value={name} onChange={this.handleChange} />
				<input type="text" name="price" placeholder="Price" value={price} onChange={this.handleChange} />
				<input type="text" name="imageUrl" placeholder="Image URL" value={imageUrl} onChange={this.handleChange} />
				<input type="text" name="description" placeholder="Description" value={description} onChange={this.handleChange} />
				<input type="text" name="shipping" placeholder="Shipping" value={shipping} onChange={this.handleChange} />

				<button type="submit">Save</button>
				<button type="button" onClick={this.deleteItem}>Delete</button>
			</form>
		)
	}
}

export default Edit
