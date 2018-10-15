import React from 'react'
// import yelpLogo from '../../public/Yelp_trademark_RGB.png'

const RestaurantRow = props => {
  const {name, rating, price, url} = props.info
  return (
    <div className="uk-width-1-1 uk-grid uk-grid-small uk-child-width-1-1 uk-card uk-card-default uk-card-small uk-card-hover">
      <div className="uk-card-header">
        <h4>{name}</h4>
      </div>
      <div className="uk-card-body uk-grid uk-grid-collapse uk-child-width-1-3">
        <p className="uk-text-center">{rating}</p>
        <p className="uk-text-center">{price}</p>
        <p className="uk-text-center">
          <a href={url}>
        View on Yelp
            {/* <img src={yelpLogo} alt="yelp" className="yelpLogo"/> */}
          </a>
        </p>
      </div>
    </div>
  )
}

export default RestaurantRow
