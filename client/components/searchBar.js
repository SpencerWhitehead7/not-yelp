import React from 'react'

const SearchBar = props => {
  const {handleChange, handleSubmit, city, APISort, APIIsOpenFilter, priceFilter} = props
  return (
    <form onSubmit={handleSubmit} className="uk-flex uk-flex-column uk-flex-center uk-flex-middle">

      <div>
        <input
          type="text"
          name="city"
          id="city"
          value={city}
          onChange={handleChange}
          placeholder="Enter city name"
          className="uk-input uk-form-width-medium"
        />
        <button
          type="submit"
          disabled={!city}
          className="uk-button uk-button-primary"
        >
          SEARCH!
        </button>
      </div>

      <div>
        <input
          type="checkbox"
          name="APISort"
          id="APISort"
          checked={APISort}
          onChange={handleChange}
          className="uk-checkbox"
        />
        <label htmlFor="APISort">
        &nbsp;Get Yelp results by rating
        </label>
      </div>

      <div>
        <input
          type="checkbox"
          name="APIIsOpenFilter"
          id="APIIsOpenFilter"
          checked={APIIsOpenFilter}
          onChange={handleChange}
          className="uk-checkbox"
        />
        <label htmlFor="APIIsOpenFilter">
        &nbsp;Only get currently open restaurants
        </label>
      </div>

      <div>
        <label htmlFor="priceFilter">
          Restaurants must be
        </label>
        <select
          name="priceFilter"
          id="priceFilter"
          onChange={handleChange}
          className="uk-select uk-form-width-xsmall uk-form-width-medium"
        >
          <option value="4">$$$$</option>
          <option value="3">$$$</option>
          <option value="2">$$</option>
          <option value="1">$</option>
        </select>
        <label htmlFor="priceFilter">
          or cheaper
        </label>
      </div>

    </form>
  )
}

export default SearchBar
