import React from 'react';
import Routes from './Routes';
import { Navbar, Nav } from 'react-bootstrap';
import './index.css';


class App extends React.Component {

	state = {
		isAuthenticated: false,
		userHasAuthenticated: x => this.setState({ isAuthenticated: x })
	}

	render() {
		return (
			<>
				<style type="text/css">
					{`
						body {
							  background: #eee;
						}
					`}
				</style>

				<Navbar bg="dark" variant="dark">
				<div class="dropdown">
  				<button class="btn" type="button" data-toggle="dropdown">
						<img src="https://pngimage.net/wp-content/uploads/2019/05/menu-hamburger-png-.png" width="20" height="15"/>
  					<span class="caret"></span></button>
						<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
	    				<a class="dropdown-item" href="/home">Home</a>
							<a class="dropdown-item" href="/profile">My Profile</a>
	    				<a class="dropdown-item" href="/search">Search Articles</a>
							<a class="dropdown-item" href="/">Post Article</a>
							<a class="dropdown-item" href="/">Contact</a>
	  				</div>
					</div>
					<Navbar.Brand href="/">JBox</Navbar.Brand>
					<Nav className="ml-auto">
						{this.state.isAuthenticated &&
							<Nav.Link href="/login">Logout</Nav.Link>}
					</Nav>
				</Navbar>

				<Routes appProps={ this.state }/>
			</>
		);
	}
}

export default App;
