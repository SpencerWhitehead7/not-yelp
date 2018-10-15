import React from 'react'

const SearchBar = props => {
  const {handleChange, handleSubmit, city, APISort} = props
  return (
    <form onSubmit={handleSubmit} className="uk-flex uk-flex-column uk-flex-center uk-flex-middle">
      <div>
        <label htmlFor="city">
          <input
            type="text"
            name="city"
            value={city}
            onChange={handleChange}
            placeholder="Enter city name"
            className="uk-input uk-form-width-medium"
          />
        </label>
        <button
          type="submit"
          disabled={!city}
          className="uk-button uk-button-primary"
        >
        SEARCH!
        </button>
      </div>
      <label htmlFor="APISort">
        <input
          type="checkbox"
          name="APISort"
          checked={APISort}
          onChange={handleChange}
          className="uk-checkbox"
        />
        &nbsp;Get Yelp results by rating
      </label>
    </form>
  )
}

export default SearchBar
