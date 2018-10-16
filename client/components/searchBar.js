import React from 'react'

const SearchBar = props => {
  const {handleChange, handleSubmit, city, APISort, APIIsOpenFilter} = props
  return (
    <form onSubmit={handleSubmit} className="uk-flex uk-flex-column uk-flex-middle">

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

      <select
        name="priceFilter"
        id="priceFilter"
        onChange={handleChange}
        className="uk-select uk-form-width-small uk-form-width-medium"
      >
        <option value="4">$$$$ or less</option>
        <option value="3">$$$ or less</option>
        <option value="2">$$ or less</option>
        <option value="1">$ or less</option>
      </select>

      <div className="uk-flex uk-flex-center uk-flex-middle uk-flex-wrap">
        <div className="query-checkbox">
          <label htmlFor="APISort">
            Get&nbsp;Yelp&nbsp;results&nbsp;by&nbsp;rating&nbsp;
          </label>
          <input
            type="checkbox"
            name="APISort"
            id="APISort"
            checked={APISort}
            onChange={handleChange}
            className="uk-checkbox"
          />
        </div>
        <div className="query-checkbox">
          <label htmlFor="APIIsOpenFilter">
            Currently&nbsp;open&nbsp;only&nbsp;
          </label>
          <input
            type="checkbox"
            name="APIIsOpenFilter"
            id="APIIsOpenFilter"
            checked={APIIsOpenFilter}
            onChange={handleChange}
            className="uk-checkbox"
          />
        </div>
      </div>

    </form>
  )
}

export default SearchBar
