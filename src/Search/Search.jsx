import React from 'react';
import { Redirect } from 'react-router-dom';
import { SearchRepository } from '../Api/searchRepository';
import './search.css';

const categories = ["Health", "Tech", "Wealth", "Politics"]

export class Search extends React.Component {

  searchRepo = new SearchRepository();

    state = {
      input: '',
      category: 0,
      filter: 0,
      articles: []
    }

    applySearch() {
      if(this.state.input !== '' || this.state.category !== '' || this.state.filter !== ''){
      let param = {input: this.state.input, category: this.state.category, filter: this.state.filter}
      this.searchRepo.search(param)
        .then(arr => {
            console.log(arr)
            this.setState({
                parks: arr
            });
        })
      }
    }

    render () {
      return <>
      {sessionStorage.getItem("isAuthenticated") !== "true" &&
        (<Redirect to="/login"/>)}

        <div className="container-fluid" style={{paddingRight: '10vw', paddingLeft: '10vw'}}>
            <div className = "" style={{marginTop: '4em', display: 'flex', justifyContent: 'space-between'}}>
              <section style={{width: "82.5vw", margin: "auto"}}>

                { this.carousel() }

                <section class="search-sec">
                    <div class="container">
                        <form>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="row">
                                        <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                            <input type="text"
                                                    class="form-control search-slt"
                                                    placeholder="Title/Author's Name"
                                                    value={ this.state.input }
                                                    onChange={e => this.setState({input: e.target.value})}/>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 p-0">

                                            <select class="form-control search-slt"
                                                    id="exampleFormControlSelect1"
                                                    value={ this.state.category }
                                                    onChange={e => this.setState({category: e.target.value})}>
                                            <option className="dropdown-item" value="0">All Categories</option>
                                            { categories.map((d, i) => <option className="dropdown-item" value={ d } key={i}>{ d }</option> ) }
                                            </select>

                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 p-0">

                                            <select class="form-control search-slt"
                                                    id="exampleFormControlSelect1"
                                                    value={ this.state.filter }
                                                    onChange={e => this.setState({filter: e.target.value})}>
                                                <option value="0">Filter</option>
                                                <option value="date">Most Recent</option>
                                                <option value="rating">Highest Rating</option>
                                                <option value="author">Authors Only</option>
                                                <option value="article">Articles Only</option>
                                            </select>

                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                            <button type="button" class="btn btn-danger wrn-btn" onClick={() => this.applySearch()}>Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </section>
            { this.displayArticles() }
        </div>
      </div>
    </>;
  }

  displayArticles() {
    const list = [];
    this.state.articles.map((article, i) =>
      list.push(
        <div>
        </div>
      ))


     return list;
  }

  carousel() {
    return <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
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
   }

}

export default Search;
