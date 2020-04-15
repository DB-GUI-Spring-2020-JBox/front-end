import React from 'react';
import Routes from './Routes';
import { Navbar, Nav } from 'react-bootstrap';
import './index.css';

class App extends React.Component {

	state = {
		isAuthenticated: false,
		userHasAuthenticated: x => this.setState({ isAuthenticated: x }),
		bgDisplay: ""
	}

	componentDidMount() {
		if(sessionStorage.getItem("isAuthenticated") === "true"){
			this.setState({bgDisplay: "none"});
		}
	}

	render() {
		return (
			<>
			<div className="content-wrap" style={{background: this.state.bgDisplay}}>
				<style type="text/css">
					{`
						body {
							  background: #eee;
						}
					`}
				</style>
					<Navbar bg="dark" variant="dark">
						<div className="dropdown">
  						<button className="btn" type="button" data-toggle="dropdown" style={{marginTop: "-4px"}}>
								<img src="https://pngimage.net/wp-content/uploads/2019/05/menu-hamburger-png-.png" alt="" width="30" height="20" style={{marginTop: "-10px"}}/>
  							<span className="caret"></span></button>
							<div className="dropdown-menu drop" aria-labelledby="dropdownMenuButton" style={{border: "none", margin: "8px 0px 0px -20px", paddingRight: "5px", background: "rgb(54, 58, 63)"}}>
	    					<a className="dropdown-item" href="/">Home</a>
								<a className="dropdown-item" href="/profile">My Profile</a>
								<a className="dropdown-item" href="/browse">Browse</a>
	    					<a className="dropdown-item" href="/search">Search</a>
								<a className="dropdown-item" href="/">Post Article</a>
								<a className="dropdown-item"  href="/messenger/t/2">Messenger</a>
								<a className="dropdown-item"  href="/">Contact</a>
								
	  					</div>
						</div>
					<Navbar.Brand href="/">JBox<img src={require('./Images/logoHead.png')} style={{position: "absolute", left: "48vw", marginTop: "-12px"}} alt="" height="53" width="53"/></Navbar.Brand>
					<Nav className="ml-auto">
					{ sessionStorage.getItem("isAuthenticated") === "true" &&
						<Nav.Link onClick={ () => sessionStorage.setItem("isAuthenticated", "false")} href="/">Logout</Nav.Link>}
					</Nav>
				</Navbar>

				<Routes appProps={ this.state }/>

			    <footer className="site-footer">
			      <div className="container-fluid" style={{paddingRight: '10vw', paddingLeft: '10vw'}}>
			        <div className="row footer-head" style={{marginTop: "-20px", marginBottom: "-20px"}}>
			          <div className="col-sm-12 col-md-6">
			            <h6>ABOUT</h6>
									<div><p className="text-justify ">JBox is a free lance journalism website that blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah...</p></div>
			          </div>
			          <div className="col-xs-6 col-md-3 links">
			            <h6 className="footer-title">CATEGORIES</h6>
			            <ul className="footer-links">
			              <li><a href="/">Health, Wealth,</a></li>
			              <li><a href="/">Technology, Politics,</a></li>
			              <li><a href="/">and More!</a></li>
			            </ul>
			          </div>
			          <div className="col-xs-6 col-md-3">
			            <h6 className="footer-title">QUICK LINKS</h6>
			            <ul className="footer-links">
			              <li><a href="/">Home</a></li>
			              <li><a href="/profile">My Profile</a></li>
			              <li><a href="/search">Search</a></li>
			            </ul>
			          </div>
			        </div>
			        <hr></hr>
			      </div>
						<div className="container-fluid" style={{paddingRight: '10vw', paddingLeft: '10vw'}}>
			        <div className="row">
			          <div className="col">
			            <p className="copyright-text">Copyright &copy; 2020 - Guys Who Code.</p>
									<ul className="social-icons" style={{marginTop: "-10px"}}>
										<li><a href="https://www.facebook.com"><img src={require('./Images/facebook.png')} alt="facebook" width="40" height="40"/></a></li>
										<li><a href="https://www.twitter.com"><img src={require('./Images/twitter.png')} alt="twitter" width="40" height="40"/></a></li>
										<li><a href="https://www.instagram.com"><img src={require('./Images/instagram.png')} alt="instagram" width="40" height="40"/></a></li>
										<li><a href="https://www.github.com"><img src={require('./Images/github.jpg')} alt="github" width="40" height="40"/></a></li>
									</ul>
			          </div>
			        </div>
			      </div>
					</footer>
				</div>
			</>
		);
	}
}

export default App;
