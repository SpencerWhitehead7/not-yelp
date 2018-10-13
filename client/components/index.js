import React from 'react'
import axios from 'axios'

import RestaurantRow from './restaurantRow'

class Main extends React.Component{
  constructor(){
    super()
    this.state = {
      restaurants : [],
      page : 1,
    }
  }

  getRestaurants = async () => {
    try{
      const {data} = await axios.get(`/api/yelp/NYC`)
      console.log(data)
      this.setState({
        restaurants : data.businesses,
      })
    }catch(err){
      console.log(err)
    }
  }

  render(){
    console.log(this.state)
    const {restaurants, page} = this.state
    return (
      <div>
        <button type="button" onClick={this.getRestaurants}>
        GET RESTAURANTS
        </button>
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
