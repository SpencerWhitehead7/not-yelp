import React from 'react'
import axios from 'axios'

import SearchBar from './searchBar'
import ErrorWarning from './errorWarning'
import RestaurantRow from './restaurantRow'


class Main extends React.Component{
  constructor(){
    super()
    this.state = {
      city : ``,
      page : 1,
      restaurants : [],
      error : ``,
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    try{
      const {data} = await axios.get(`/api/yelp/${this.state.city}`)
      console.log(data)
      this.setState({
        restaurants : data.businesses,
      })
    }catch(err){
      this.setState({
        error : err.message,
      })
      console.log(err)
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name] : event.target.value,
    })
  }

  render(){
    console.log(this.state)
    const {city, page, restaurants, error} = this.state
    return (
      <div>
        <SearchBar handleChange={this.handleChange} handleSubmit={this.handleSubmit} city={city}/>
        {error.length > 0 && <ErrorWarning error={error}/>}
        {
          restaurants.length > 0 && restaurants.map(restaurant => (
            <RestaurantRow
              key={restaurant.id}
              info={restaurant}
            />
          ))
        }
      </div>
    )
  }
}

export default Main
