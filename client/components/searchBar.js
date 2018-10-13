import React from 'react'

const SearchBar = props => {
  const {handleChange, handleSubmit, city} = props
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="city">
        Search for Restaurants in:
        <input type="text" name="city" value={city} onChange={handleChange}/>
      </label>
      <input type="submit" value="submit"/>
    </form>
  )
}

export default SearchBar
