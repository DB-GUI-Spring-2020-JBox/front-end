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
