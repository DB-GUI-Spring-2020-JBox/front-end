import React from 'react';
import Routes from './Routes';
import { Navbar, Nav } from 'react-bootstrap';
import './index.css';


class App extends React.Component {

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
						{ sessionStorage.getItem("isAuthenticated") == "true" &&
							<Nav.Link href="/login">Logout</Nav.Link>}
					</Nav>
				</Navbar>

				<Routes />
			</>
		);
	}
}

export default App;
