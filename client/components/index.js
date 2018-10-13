import React from 'react'
import axios from 'axios'

import SearchBar from './searchBar'
import RestaurantRow from './restaurantRow'

class Main extends React.Component{
  constructor(){
    super()
    this.state = {
      city : ``,
      page : 1,
      restaurants : [],
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
    const {city, page, restaurants} = this.state
    return (
      <div>
        <SearchBar handleChange={this.handleChange} handleSubmit={this.handleSubmit} city={city}/>
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
