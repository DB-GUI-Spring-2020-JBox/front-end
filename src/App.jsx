import React from 'react';
import Routes from './Routes';
import { Footer } from './App/footer';
import { Header } from './App/header';
import './index.css';

class App extends React.Component {

	state = {
		bgDisplay: "",
		dimensions: {
			width: 0,
			height: 0
		}
	}

	componentDidMount() {
		if(sessionStorage.getItem("isAuthenticated") === "true"){
			this.setState({bgDisplay: "none"});
		}
	}

	componentWillMount() {
		this.setState({ dimensions: {width: window.innerWidth, height: window.innerHeight} });
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
					<Header/>

					<Routes appProps={ this.state }/>

					<Footer/>
				</div>
			</>
		);
	}
}

export default App;
