import React from 'react'
import axios from 'axios'

import SearchBar from './searchBar'
import SortSelect from './sortSelect'
import ErrorWarning from './errorWarning'
import RestaurantRow from './restaurantRow'
import PageButtons from './pageButtons'


class Main extends React.Component{
  constructor(){
    super()
    this.state = {
      city : ``,
      page : 1,
      priceFilter : 4,
      APISort : false,
      APIIsOpenFilter : false,
      total : 0,
      jumpTo : 1,
      restaurants : [],
      unsortedRestaurants : [],
      sortBy : `none`,
      loading : false,
      error : ``,
    }
  }

  // LIFECYCLE METHODS START

  componentDidUpdate = (prevProps, prevState) => {
    if(prevState.page !== this.state.page){
      this.callApi(this.state.page)
    }
    if(prevState.sortBy !== this.state.sortBy){
      const sortedRestaurants = this.sortRestaurants([...prevState.unsortedRestaurants])
      this.setState({restaurants : sortedRestaurants})
    }
  }

  // LIFECYCLE METHODS END
  // UTILITY METHODS START

  sortRestaurants = restaurants => {
    let sortingFn = () => undefined
    switch(this.state.sortBy){
      case `ratingHtL`:
        sortingFn = (a, b) => b.rating - a.rating
        break
      case `ratingLtH`:
        sortingFn = (a, b) => a.rating - b.rating
        break
      case `priceLtH`:
        sortingFn = (a, b) => a.price.length - b.price.length
        break
      case `priceHtL`:
        sortingFn = (a, b) => b.price.length - a.price.length
        break
      default:
        return restaurants
    }
    return restaurants.sort(sortingFn)
  }

  callApi = page => {
    // construct query string
    let queryString = `?categories=restaurants`
    queryString += `&location=${this.state.city}`
    queryString += `&offset=${(page - 1) * 20}`
    queryString += this.state.APISort ? `&sort_by=rating` : ``
    queryString += this.state.APIIsOpenFilter ? `&open_now=true` : ``
    const priceFilterQuery = []
    for(let i = 0; i < this.state.priceFilter; i++){
      priceFilterQuery.push(`${i + 1}`)
    }
    queryString += `&price=${priceFilterQuery.join(`,`)}`
    // set loading state and make request with query string
    this.setState({
      loading : true,
      restaurants : [],
      unsortedRestaurants : [],
      error : ``,
    }, async () => {
      try{
        // Call succeeds, set new data to state
        const {data} = await axios.get(`/api/yelp/`, {params : {queryString}})
        const sortedRestaurants = this.sortRestaurants([...data.businesses])
        this.setState({
          // Due to API limiting you to only 1000 businesses; offsets higher than 1000 error
          page,
          total : data.total < 1000 ? data.total : 1000,
          restaurants : sortedRestaurants,
          unsortedRestaurants : data.businesses,
          loading : false,
          error : ``,
        })
      }catch(err){
        // Call fails, set errored state
        this.setState({
          page : 1,
          total : 0,
          jumpTo : 1,
          restaurants : [],
          unsortedRestaurants : [],
          loading : false,
          error : err.message,
        })
        console.log(err)
      }
    })
  }

  // UTILITY METHODS END
  // FORM CONTROLS START

  handleChange = event => {
    event.stopPropagation()
    const target = event.target.name
    let value = event.target.type === `checkbox` ? event.target.checked : event.target.value
    // Deals with these forms' numeric values being stored as strings
    if(target === `page` ||
        target === `jumpTo` ||
        target === `priceFilter`){
      value = Number(value)
    }
    // Deals with users clicking in the buttons div, but not on a button
    if(typeof value !== `number` || !isNaN(value)){
      const newState = {[target] : value}
      if(target === `page`) newState.jumpTo = value
      this.setState(newState)
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.callApi(1)
  }

  jumpToPage = event => {
    event.preventDefault()
    this.setState(prevState => ({page : prevState.jumpTo}))
  }

  // FORM CONTROLS END

  render(){
    const {loading, city, page, total, restaurants, APISort, APIIsOpenFilter, error} = this.state
    return (
      <React.Fragment>
        <h1 className="uk-text-center">Not-Yelp</h1>
        <SearchBar
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          city={city}
          APISort={APISort}
          APIIsOpenFilter={APIIsOpenFilter}
        />
        <SortSelect handleChange={this.handleChange}/>
        {error.length > 0 && <ErrorWarning error={error}/>}
        {loading && <div
          uk-spinner="ratio: 10"
          id="loading-spinner"
          className="uk-flex uk-flex-center"
        />}
        {
          restaurants.length > 0 &&
          <React.Fragment>
            <div id="list-container" className="uk-grid">
              {
                restaurants.map(restaurant => (
                  <RestaurantRow
                    key={restaurant.id}
                    info={restaurant}
                  />
                ))
              }
            </div>
            <PageButtons
              handleChange={this.handleChange}
              jumpToPage={this.jumpToPage}
              page={page}
              total={total}
            />
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

export default Main
