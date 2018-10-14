import React from 'react'
import axios from 'axios'

import SearchBar from './searchBar'
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
      error : ``,
    }
  }

  callApi = async page => {
    try{
      let queryString = `?categories=restaurants`
      queryString += `&location=${this.state.city}`
      queryString += `&offset=${(page - 1) * 20}`
      const {data} = await axios.get(`/api/yelp/`, {params : {queryString}})
      console.log(data)
      this.setState({
        total : data.total,
        restaurants : data.businesses,
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
    this.setState({[event.target.name] : event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    this.callApi(1)
  }

  changePage = event => {
    event.preventDefault()
    const newPage = Number(event.target.value)
    if(newPage){
      this.callApi(newPage)
    }
  }

  render(){
    console.log(this.state)
    const {city, page, total, restaurants, error} = this.state
    return (
      <div>
        <SearchBar handleChange={this.handleChange} handleSubmit={this.handleSubmit} city={city}/>
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
            <PageButtons page={page} changePage={this.changePage} total={total}/>
          </div>
        }
      </div>
    )
  }
}

export default Main
