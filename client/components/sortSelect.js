import React from 'react'

const SortSelect = props => {
  const {handleChange} = props
  return (
    <form className="uk-flex uk-flex-center uk-flex-middle">
      <label htmlFor="sortBy">
        Sort page by&nbsp;
      </label>
      <select
        name="sortBy"
        id="sortBy"
        onChange={handleChange}
        className="uk-select uk-form-small uk-form-width-medium"
      >
        <option value="none">None</option>
        <option value="ratingHtL">Rating (high to low)</option>
        <option value="ratingLtH">Rating (low to high)</option>
        <option value="priceLtH">Price (low to high)</option>
        <option value="priceHtL">Price (high to low)</option>
      </select>
    </form>
  )
}

export default SortSelect
