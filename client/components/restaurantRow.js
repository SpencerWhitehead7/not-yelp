import React from 'react'
// import yelpLogo from '../../public/Yelp_trademark_RGB.png'

const RestaurantRow = props => {
  const {name, rating, price, url} = props.info
  const reviewCount = props.info.review_count
  return (
    <div>
      <span>{name}</span>
      <span>{rating}</span>
      <span>{price}</span>
      <span>
        {reviewCount}
        &nbsp;reviews
      </span>
      <span>
        <a href={url}>
        View on Yelp
          {/* <img src={yelpLogo} alt="yelp" className="yelpLogo"/> */}
        </a>

      </span>
    </div>
  )
}

export default RestaurantRow
