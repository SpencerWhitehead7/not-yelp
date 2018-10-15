/* eslint-disable react/no-multi-comp */

import React from 'react'

const PageButton = props => <button type="button" name="page" value={props.pageNo}>{props.pageNo}</button>

const Prev = props => <button type="button" name="page" value={props.page - 1}>Prev</button>

const Next = props => <button type="button" name="page" value={props.page + 1}>Next</button>

const Filler = () => <span> . . . </span>

const SelectPage = props => {
  const {handleChange, jumpToPage, page, lastPage} = props
  return (
    <form onSubmit={jumpToPage}>
      <label htmlFor="jumpTo">
        Jump To Page:
        <input type="number" name="jumpTo" defaultValue={page} min="1" max={lastPage} onChange={handleChange}/>
        <button type="submit">Jump!</button>
      </label>
    </form>
  )
}

const PageButtons = props => {
  const {handleChange, jumpToPage, page, total} = props
  const firstPage = 1
  const lastPage = Math.ceil(total / 20)
  const visibleButtons = []
  let firstButton = 1
  let lastButton = lastPage
  if(page < 3){
    firstButton = firstPage
    lastButton = 5
  }else if(page >= lastPage - 2){
    firstButton = lastPage - 4
  }else{
    firstButton = page - 2
    lastButton = page + 2
  }
  for(let i = firstButton; i <= lastButton; i++){
    visibleButtons.push(i)
  }
  return (
    <React.Fragment>

      <div onClick={handleChange}>

        {page > firstPage && <Prev page={page}/>}

        {page > 3 && lastPage > 10 && <PageButton pageNo={firstPage}/>}

        {page > 3 && lastPage > 10 && <Filler/>}

        {visibleButtons.map(pageNo => <PageButton pageNo={pageNo} key={pageNo}/>)}

        {page < lastPage - 2 && lastPage > 10 && <Filler/>}

        {page < lastPage - 2 && lastPage > 10 && <PageButton pageNo={lastPage}/>}

        {page < lastPage && <Next page={page}/>}

      </div>

      <SelectPage handleChange={handleChange} jumpToPage={jumpToPage} page={page} lastPage={lastPage}/>

    </React.Fragment>
  )
}

export default PageButtons
