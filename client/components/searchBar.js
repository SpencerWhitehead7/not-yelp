import React from 'react'

const SearchBar = props => {
  const {handleChange, handleSubmit, city, APISort} = props
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
    </form>
  )
}

export default SearchBar
