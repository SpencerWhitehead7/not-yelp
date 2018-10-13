import React from 'react'

const RestaurantRow = props => {
  const {name} = props.info
  return (
    <div>
      {name}
    </div>
  )
}

export default RestaurantRow
