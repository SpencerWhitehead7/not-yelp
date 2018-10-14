import React from 'react'

const SearchBar = props => {
  const {handleChange, handleSubmit, city, APISort} = props
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="city">
        Search for Restaurants in:
        <input type="text" name="city" value={city} onChange={handleChange}/>
      </label>
      <button type="submit" disabled={!city}>Search!</button>
      <br/>
      <label htmlFor="APISort">
        Get Yelp results by rating?
        <input type="checkbox" name="APISort" checked={APISort} onChange={handleChange}/>
      </label>
    </form>
  )
}

export default SearchBar
