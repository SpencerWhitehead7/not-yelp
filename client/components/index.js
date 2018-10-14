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
      total : 0,
      restaurants : [],
      unsortedRestaurants : [],
      sortBy : `none`,
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

  callApi = async page => {
    try{
      let queryString = `?categories=restaurants`
      queryString += `&location=${this.state.city}`
      queryString += `&offset=${(page - 1) * 20}`
      const {data} = await axios.get(`/api/yelp/`, {params : {queryString}})
      console.log(data)
      const sortedRestaurants = this.sortRestaurants([...data.businesses])
      this.setState({
        // Due to API limiting you to only 1000 businesses; offsets higher than 1000 error
        total : data.total < 1000 ? data.total : 1000,
        restaurants : sortedRestaurants,
        unsortedRestaurants : data.businesses,
        page,
      })
    }catch(err){
      this.setState({
        page : 1,
        total : 0,
        restaurants : [],
        error : err.message,
      })
      console.log(err)
    }
  }

  handleChange = event => {
    event.preventDefault()
    const target = event.target.name
    let value = event.target.value
    // Deals with page values being stored as strings
    if(target === `page`){
      value = Number(value)
    }
    // Deals with users clicking in the pages div, but not on a button
    if(typeof value !== `number` || !isNaN(value)){
      this.setState({[target] : value})
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.callApi(1)
  }

  render(){
    console.log(this.state)
    const {city, page, total, restaurants, error} = this.state
    return (
      <div>
        <SearchBar handleChange={this.handleChange} handleSubmit={this.handleSubmit} city={city}/>
        <SortSelect handleChange={this.handleChange}/>
        {error.length > 0 && <ErrorWarning error={error}/>}
        {
          restaurants.length > 0 &&
          <div>
            {
              restaurants.map(restaurant => (
                <RestaurantRow
                  key={restaurant.id}
                  info={restaurant}
                />
              ))
            }
            <PageButtons page={page} handleChange={this.handleChange} total={total}/>
          </div>
        }
      </div>
    )
  }
}

export default Main
