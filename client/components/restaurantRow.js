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
        <p>
          {price}
          &nbsp;-&nbsp;
          {categoriesStr}
        </p>
      </div>
      <div className="uk-card-body uk-flex uk-flex-around">
        <div>
          <p className="no-margin">
            {reviewCount}
            &nbsp;Reviews
          </p>
          <img data-src={imgs[stars]} alt="rating" width="164px" height="28px" uk-img="true" className="stars"/>
        </div>
        <div>
          <a href={url}>
            <p className="no-margin">
              View on
            </p>
            <img src={imgs.yelpLogo} alt="yelp" className="yelp-logo"/>
          </a>
        </div>
      </div>
    </div>
  )
}

export default RestaurantRow
