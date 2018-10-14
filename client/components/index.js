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

  handleSubmit = async event => {
    event.preventDefault()
    try{
      const {data} = await axios.get(`/api/yelp/?location=${this.state.city}`)
      console.log(data)
      this.setState({
        total : data.total,
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
    event.preventDefault()
    this.setState({
      [event.target.name] : event.target.value,
    })
  }

  changePage = event => {
    event.preventDefault()
    const newPage = Number(event.target.value)
    if(newPage){
      this.setState({
        page : Number(event.target.value),
      })
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
