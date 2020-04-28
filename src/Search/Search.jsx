import React from 'react';
import { Redirect } from 'react-router-dom';
import { SearchRepository } from '../Api/searchRepository';
import { ArticleCard } from '../Articles';
import './search.css';

const categories = ["Health", "Tech", "Wealth", "Politics"]

export class Search extends React.Component {

    searchRepo = new SearchRepository();

    state = {
      input: '',
      category: 0,
      filter: 0,
      articles: ''
    }

    applySearch() {
      if(this.state.input !== '' || this.state.category !== '' || this.state.filter !== ''){
      let tempInput = this.state.input
      if(this.state.input === '') { tempInput = 0 }
      let param = {input: tempInput, category: this.state.category, filter: this.state.filter}
      console.log(param);
      this.searchRepo.search(param)
        .then(arr => {
            this.setState({articles: this.arrayTo2DArray2(arr, 4)});
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

                <section className="search-sec">
                    <div className="container">
                        <form>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                            <input type="text"
                                                    className="form-control search-slt"
                                                    placeholder="Title/Author's Name"
                                                    value={ this.state.input }
                                                    onChange={e => this.setState({input: e.target.value})}/>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-12 p-0">

                                            <select className="form-control search-slt"
                                                    id="exampleFormControlSelect1"
                                                    value={ this.state.category }
                                                    onChange={e => this.setState({category: e.target.value})}>
                                            <option className="dropdown-item" value="0">All Categories</option>
                                            { categories.map((d, i) => <option className="dropdown-item" value={ d.toLowerCase() } key={i}>{ d }</option> ) }
                                            </select>

                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-12 p-0">

                                            <select className="form-control search-slt"
                                                    id="exampleFormControlSelect1"
                                                    value={ this.state.filter }
                                                    onChange={e => this.setState({filter: e.target.value})}>
                                                <option value="0">No Filter</option>
                                                <option value="DESC">Newest</option>
                                                <option value="ASC">Oldest</option>
                                                <option value="rating">User Rating</option>
                                                <option value="article">Articles Only</option>
                                            </select>

                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                            <button type="button" className="btn btn-danger wrn-btn" onClick={() => this.applySearch()}>Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </section>
        </div>
        <div className="search-results">
          { this.displayArticles() }
        </div>
      </div>
    </>;
  }


  displayArticles() {

    const list = []
    for (let i = 1; i < this.state.articles.length; i++) {
      list.push(    <div className="container-fluid bg-3">
            <div className="row results-row">
              {
                this.state.articles[i].map((a, i) => {
                  return <div className="col-sm-6 col-md-6 col-lg-6 col-xl article-row"  style={{ padding: "0", justifyContent: "space-between"}}>
                    <ArticleCard authorid={ a.authorId } id={a.ID} title={ a.title } image={ a.image } snippet={ a.snippet } author={ a.author }
                      date={ a.datePosted } category={ a.category } key={ i }/>
                  </div>})
                }
            </div>
          </div>)
    }
     return list;
  }


  arrayTo2DArray2(list, howMany) {
    var idx = 0
    var result = [{}]

    while (idx < list.length) {
      if (idx % howMany === 0) result.push([])
      result[result.length - 1].push(list[idx++])
    }

    return result
  }

  carousel() {
      return <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
            <div className="carousel-inner">
                <img src={require('../Images/logoHead.png')} alt="" width="100" height="100"/>
                <div className="carousel-item active">
                    <img src={require('../Images/carouselOne.png')} className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src={require('../Images/carouselTwo.png')} className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src={require('../Images/carouselThree.png')} className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src={require('../Images/carouselFour.png')} className="d-block w-100" alt="..."/>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
          </div>
   }

}

export default Search;
