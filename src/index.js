import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Link } from "react-router-dom"
import axios from "axios"
import Home from "./components/Home"
import Trinkets from "./components/Trinkets"
import Trinket from "./components/Trinket"
import Create from "./components/Create"
import Edit from "./components/Edit"
import "./styles.css"

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			items: []
		}
	}

	componentDidMount() {
		axios.get('http://localhost:3333/items')
			.then(response => {
				this.setState({
					items: response.data
				})
			})
			.catch(err => {
				console.log('Error:', err)
			})
	}

	updateItems = (items) => {
		this.setState({ items })
	}

	render() {
		const { items } = this.state
		
		return (
			<div className="App">
				<nav>
					<h1 className="store-header">Jason's Trinkets</h1>
					<div className="nav-links">
						<Link to="/">Home</Link>
						<Link to="/trinkets">Trinkets</Link>
						<Link to="/new">New</Link>
					</div>
				</nav>

				<Route path="/" exact render={(props) => <Home {...props} items={items} />} />
				<Route path="/trinkets" exact render={(props) => <Trinkets {...props} items={items} />} />
				<Route path="/trinket/:id" render={(props) => <Trinket {...props} items={items} />} />
				<Route path="/new" exact render={(props) => <Create {...props} updateItems={this.updateItems} />} />
				<Route path="/edit/:id" exact render={(props) => <Edit {...props} updateItems={this.updateItems} />} />
			</div>
		)
	}
}

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("root")
)
