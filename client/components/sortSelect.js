import React from 'react'

const SortSelect = props => {
  const {handleChange} = props
  return (
    <form>
      <label htmlFor="sortBy">
        Sort By:
        <select name="sortBy" onChange={handleChange}>
          <option value="none">None</option>
          <option value="ratingLtH">Rating (high to low)</option>
          <option value="ratingLtH">Rating (low to high)</option>
          <option value="priceLtH">Price (low to high)</option>
          <option value="priceHtL">Price (high to low)</option>
        </select>
      </label>
    </form>
  )
}

export default SortSelect
