import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export const Header = props => {
    return (
      <Navbar bg="dark" variant="dark">
        <div className="dropdown">
          <button className="btn" type="button" data-toggle="dropdown" style={{ marginTop: "-4px" }}>
            <img src="https://pngimage.net/wp-content/uploads/2019/05/menu-hamburger-png-.png" alt="" width="30" height="20" style={{ marginTop: "-10px" }} />
            <span className="caret"></span></button>
          <div className="dropdown-menu drop" aria-labelledby="dropdownMenuButton" style={{ border: "none", margin: "8px 0px 0px -20px", paddingRight: "5px", background: "rgb(54, 58, 63)" }}>
            <a className="dropdown-item" href="/">Home</a>
            <a className="dropdown-item" href="/profile">My Profile</a>
            <a className="dropdown-item" href="/browse">Browse</a>
            <a className="dropdown-item" href="/search">Search</a>
            <a className="dropdown-item" href="/postarticle">Post Article</a>
            <a className="dropdown-item" href="/messenger">Messenger</a>
          </div>
        </div>
        <Navbar.Brand href="/">JBox<img src={require('../Images/logoHead.png')} style={{ position: "absolute", left: "48vw", marginTop: "-12px" }} alt="" height="53" width="53" /></Navbar.Brand>
        <Nav className="ml-auto">
          {sessionStorage.getItem("isAuthenticated") === "true" &&
            <Nav.Link onClick={() => sessionStorage.setItem("isAuthenticated", "false")} href="/">Logout</Nav.Link>}
        </Nav>
      </Navbar>
    );
}

export default Header;
