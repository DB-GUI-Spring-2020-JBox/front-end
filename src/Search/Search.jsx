import React from 'react';
import { Redirect } from 'react-router-dom';
import './search.css';

const categories = ["All Categories", "Health", "Tech", "Wealth"]

export class Search extends React.Component {

    state = {

    }

    render () {
      return <>
      {sessionStorage.getItem("isAuthenticated") !== "true" &&
        (<Redirect to="/login"/>)}
        <div className="container-fluid" style={{paddingRight: '10vw', paddingLeft: '10vw'}}>
            <div className = "" style={{marginTop: '4em', display: 'flex', justifyContent: 'space-between'}}>

            <section style={{width: "82.5vw", margin: "auto"}}>
                <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
                    <div class="carousel-inner">
                        <img src={require('../Images/logoHead.png')} alt="" width="100" height="100"/>
                        <div class="carousel-item active">
                            <img src={require('../Images/carouselOne.png')} class="d-block w-100" alt="..."/>
                        </div>
                        <div class="carousel-item">
                            <img src={require('../Images/carouselTwo.png')} class="d-block w-100" alt="..."/>
                        </div>
                        <div class="carousel-item">
                            <img src={require('../Images/carouselThree.png')} class="d-block w-100" alt="..."/>
                        </div>
                        <div class="carousel-item">
                            <img src={require('../Images/carouselFour.png')} class="d-block w-100" alt="..."/>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <section class="search-sec">
                    <div class="container">
                        <form action="#" method="post" novalidate="novalidate">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="row">
                                        <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                            <input type="text" class="form-control search-slt" placeholder="Title/Author's Name"/>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                            <select class="form-control search-slt" id="exampleFormControlSelect1">
                                            { categories.map((d, i) => <option className="dropdown-item" onClick={ e => this.setState({ category: d })} key={i}>{ d }</option> ) }
                                            </select>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                            <select class="form-control search-slt" id="exampleFormControlSelect1">
                                                <option>Filter</option>
                                                <option>Most Recent</option>
                                                <option>Highest Rating</option>
                                                <option>Authors</option>
                                                <option>Articles</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                            <button type="button" class="btn btn-danger wrn-btn">Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </section>

        </div>
      </div>
    </>;
  }
}

export default Search;
