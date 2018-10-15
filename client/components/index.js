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
      loading : false,
      city : ``,
      page : 1,
      jumpTo : 1,
      total : 0,
      restaurants : [],
      unsortedRestaurants : [],
      sortBy : `none`,
      APISort : false,
      error : ``,
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevState.page !== this.state.page){
      this.callApi(this.state.page)
    }
    if(prevState.sortBy !== this.state.sortBy && this.state.sortBy === `none`){
      this.setState({restaurants : prevState.unsortedRestaurants})
    }
    if(prevState.sortBy !== this.state.sortBy){
      const sortedRestaurants = this.sortRestaurants([...prevState.unsortedRestaurants])
      this.setState({restaurants : sortedRestaurants})
    }
  }

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
        sortingFn = () => undefined
    }
    return restaurants.sort(sortingFn)
  }

  callApi = page => {
    try{
      let queryString = `?categories=restaurants`
      queryString += `&location=${this.state.city}`
      queryString += `&offset=${(page - 1) * 20}`
      // The only (relevant to this project) sorting the API supports is ratingHtL (it uses weighted average, but my sort uses raw rating number)
      queryString += this.state.APISort ? `&sort_by=rating` : ``

      this.setState({
        loading : true,
        restaurants : [],
        unsortedRestaurants : [],
      }, async () => {
        const {data} = await axios.get(`/api/yelp/`, {params : {queryString}})
        console.log(data)
        const sortedRestaurants = this.sortRestaurants([...data.businesses])
        this.setState({
          loading : false,
          // Due to API limiting you to only 1000 businesses; offsets higher than 1000 error
          total : data.total < 1000 ? data.total : 1000,
          restaurants : sortedRestaurants,
          unsortedRestaurants : data.businesses,
          page,
        })
      })
    }catch(err){
      this.setState({
        page : 1,
        jumpTo : 1,
        total : 0,
        restaurants : [],
        unsortedRestaurants : [],
        error : err.message,
      })
      console.log(err)
    }
  }

  handleChange = event => {
    event.stopPropagation()
    const target = event.target.name
    let value = event.target.type === `checkbox` ? event.target.checked : event.target.value
    // Deals with page values being stored as strings
    if(target === `page` || target === `jumpTo`){
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

  render(){
    console.log(this.state)
    const {loading, city, page, total, restaurants, APISort, error} = this.state
    return (
      <React.Fragment>
        <SearchBar
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          city={city}
          APISort={APISort}
        />
        <SortSelect handleChange={this.handleChange}/>
        {error.length > 0 && <ErrorWarning error={error}/>}
        {loading && <div uk-spinner="ratio: 10"/>}
        {
          restaurants.length > 0 &&
          <React.Fragment>
            <ul>
              {
                restaurants.map(restaurant => (
                  <RestaurantRow
                    key={restaurant.id}
                    info={restaurant}
                  />
                ))
              }
            </ul>
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
