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
				<div className="dropdown">
  				<button className="btn" type="button" data-toggle="dropdown">
						<img src="https://pngimage.net/wp-content/uploads/2019/05/menu-hamburger-png-.png" alt="" width="20" height="15"/>
  					<span className="caret"></span></button>
						<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
	    				<a className="dropdown-item" href="/">Home</a>
							<a className="dropdown-item" href="/profile">My Profile</a>
	    				<a className="dropdown-item" href="/search">Search Articles</a>
							<a className="dropdown-item" href="/">Post Article</a>
							<a className="dropdown-item" href="/">Contact</a>
	  				</div>
					</div>
					<Navbar.Brand href="/">JBox</Navbar.Brand>
					<Nav className="ml-auto">
					{ sessionStorage.getItem("isAuthenticated") === "true" &&
						<Nav.Link onClick={ () => sessionStorage.setItem("isAuthenticated", "false") } >Logout</Nav.Link>}
					</Nav>
				</Navbar>

				<Routes appProps={ this.state }/>


				<footer className="page-footer font-small special-color-dark pt-4">
				  <div className="container">
				    <ul className="list-unstyled list-inline text-center">
				      <li className="list-inline-item">
				        <a className="btn-floating btn-fb mx-1" href="https://www.facebook.com">
				          <i className="fab fa-facebook-f"> </i>
				        </a>
				      </li>
				      <li className="list-inline-item">
				        <a className="btn-floating btn-tw mx-1" href="https://www.facebook.com">
				          <i className="fab fa-twitter"> </i>
				        </a>
				      </li>
				      <li className="list-inline-item">
				        <a className="btn-floating btn-gplus mx-1" href="https://www.facebook.com">
				          <i className="fab fa-google-plus-g"> </i>
				        </a>
				      </li>
				      <li className="list-inline-item">
				        <a className="btn-floating btn-li mx-1" href="https://www.facebook.com">
				          <i className="fab fa-linkedin-in"> </i>
				        </a>
				      </li>
				      <li className="list-inline-item">
				        <a className="btn-floating btn-dribbble mx-1" href="https://www.facebook.com">
				          <i className="fab fa-dribbble"> </i>
				        </a>
				      </li>
				    </ul>
				  </div>
				  <div className="footer-copyright text-center py-3">© 2020 Copyright:
				    <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
				  </div>
				</footer>
			</>
		);
	}
}

export default App;
