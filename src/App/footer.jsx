import React from 'react';

export const Footer = props => {
    return (
      <footer className="site-footer">
        <div className="container-fluid" style={{paddingRight: '10vw', paddingLeft: '10vw'}}>
          <div className="row footer-head" style={{marginTop: "-20px", marginBottom: "-20px"}}>
            <div className="col-sm-12 col-md-6">
              <h6>ABOUT</h6>
              <div><p className="text-justify ">JBox is a free lance journalism website where users can post their own content and represent themselves in the journalism community. Open your content to publishers around the world!</p></div>
            </div>
            <div className="col-xs-6 col-md-3 links">
              <h6 className="footer-title">CATEGORIES</h6>
              <ul className="footer-links">
                <li><a href="/browse">Health, Wealth,</a></li>
                <li><a href="/browse">Technology, Politics,</a></li>
                <li><a href="/browse">and More!</a></li>
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
                <li><a href="https://www.facebook.com"><img src={require('../Images/facebook.png')} alt="facebook" width="40" height="40"/></a></li>
                <li><a href="https://www.twitter.com"><img src={require('../Images/twitter.png')} alt="twitter" width="40" height="40"/></a></li>
                <li><a href="https://www.instagram.com"><img src={require('../Images/instagram.png')} alt="instagram" width="40" height="40"/></a></li>
                <li><a href="https://www.github.com"><img src={require('../Images/github.jpg')} alt="github" width="40" height="40"/></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer;
