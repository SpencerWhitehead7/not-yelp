import React from 'react'
import imgs from './imageImports'

const RestaurantRow = props => {
  const {name, rating, price, url, categories} = props.info

  const reviewCount = props.info.review_count
  const categoriesStr = categories.map(category => category.title).join(`, `)
  const stars = new Array(rating / 0.5).fill(`s`).join(``)

  return (
    <div className="uk-width-1-1 uk-grid uk-grid-small uk-child-width-1-1 uk-card uk-card-default uk-card-small uk-card-hover">
      <div className="uk-card-header">
        <h4>{name}</h4>
        <p>{categoriesStr}</p>
      </div>
      <div className="uk-card-body uk-grid uk-grid-collapse uk-child-width-1-3">
        <div>
          <img data-src={imgs[stars]} alt="rating" width="164px" height="28px" uk-img="true" className="stars"/>
          <span>
            {reviewCount}
            &nbsp;Reviews
          </span>
        </div>
        <p className="uk-text-center">{price}</p>
        <div>
          <a href={url}>
            <p>
              View on
              <img src={imgs.yelpLogo} alt="yelp" className="yelp-logo"/>
            </p>
          </a>
        </div>
      </div>
    </div>
  )
}

export default RestaurantRow
