/* eslint-disable react/no-multi-comp */

import React from 'react'

const PageButton = props => <button type="button" name="page" value={props.pageNo}>{props.pageNo}</button>

const Prev = props => <button type="button" name="page" value={props.page - 1}>Prev</button>

const Next = props => <button type="button" name="page" value={props.page + 1}>Next</button>

const Filler = () => <span> . . . </span>

const PageButtons = props => {
  const {page, changePage, total} = props
  const firstPage = 1
  const lastPage = Math.ceil(total / 20)
  const visibleButtons = []
  if(lastPage <= 10){
    for(let i = 1; i <= lastPage; i++){
      visibleButtons.push(i)
    }
  }else if(page < 3){
    for(let i = firstPage; i <= 5; i++){
      visibleButtons.push(i)
    }
  }else if(page >= lastPage - 2){
    for(let i = lastPage - 2; i <= lastPage; i++){
      visibleButtons.push(i)
    }
  }else{
    for(let i = page - 2; i <= page + 2; i++){
      visibleButtons.push(i)
    }
  }
  return (
    <div onClick={changePage}>

      {page > firstPage && <Prev page={page}/>}

      {page > 3 && lastPage > 10 && <PageButton pageNo={firstPage}/>}

      {page > 3 && lastPage > 10 && <Filler/>}

      {visibleButtons.map(pageNo => <PageButton pageNo={pageNo} key={pageNo}/>)}

      {page < lastPage - 2 && lastPage > 10 && <Filler/>}

      {page < lastPage - 2 && lastPage > 10 && <PageButton pageNo={lastPage}/>}

      {page < lastPage && <Next page={page}/>}

    </div>
  )
}

export default PageButtons
