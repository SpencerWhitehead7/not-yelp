import React from 'react'
// import yelpLogo from '../../public/Yelp_trademark_RGB.png'

const RestaurantRow = props => {
  const {name, rating, price, url} = props.info
  return (
    <div className="uk-width-1-1 uk-grid uk-grid-small uk-child-width-1-4">
      <span className="uk-text-left">{name}</span>
      <span className="uk-text-center">{rating}</span>
      <span className="uk-text-center">{price}</span>
      <span className="uk-text-right">
        <a href={url}>
        View on Yelp
          {/* <img src={yelpLogo} alt="yelp" className="yelpLogo"/> */}
        </a>
      </span>
    </div>
  )
}

export default RestaurantRow
