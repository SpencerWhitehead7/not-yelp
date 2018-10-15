/* eslint-disable react/no-multi-comp */

import React from 'react'

const PageButton = props => {
  const {pageNo, page} = props
  const classNameStr = `uk-button uk-button-small ${page === props.pageNo ? `uk-button-primary` : `uk-button-default`}`
  return (
    <button
      type="button"
      name="page"
      value={pageNo}
      className={classNameStr}
    >
      {props.pageNo}
    </button>
  )
}

const PrevButton = props => (
  <div>
    <span uk-icon="chevron-left"/>
    <button
      type="button"
      name="page"
      value={props.page - 1}
      className="uk-button uk-button-default uk-button-small"
    >
      Prev
    </button>
  </div>
)

const NextButton = props => (
  <div>
    <button
      type="button"
      name="page"
      value={props.page + 1}
      className="uk-button uk-button-default uk-button-small"
    >
    Next
    </button>
    <span uk-icon="chevron-right"/>
  </div>
)

const Filler = () => <span> . . . </span>

const SelectPage = props => {
  const {handleChange, jumpToPage, page, lastPage} = props
  return (
    <form onSubmit={jumpToPage} className="uk-flex uk-flex-center uk-flex-middle">
      <label htmlFor="jumpTo">
        Jump To Page&nbsp;
      </label>
      <input
        type="number"
        name="jumpTo"
        id="jumpTo"
        defaultValue={page}
        min="1"
        max={lastPage}
        onChange={handleChange}
        className="uk-input uk-form-small uk-form-width-xsmall"
      />
      <button type="submit" className="uk-button uk-button-primary uk-button-small">Jump!</button>
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
  if(page < 5){
    firstButton = firstPage
    lastButton = lastPage < 9 ? lastPage : 9
  }else if(page >= lastPage - 4){
    firstButton = lastPage - 8 >= firstPage ? lastPage - 8 : firstPage
  }else{
    firstButton = page - 4 >= 1 ? page - 4 : firstPage
    lastButton = page + 4 <= lastPage ? page + 4 : lastPage
  }
  for(let i = firstButton; i <= lastButton; i++){
    visibleButtons.push(i)
  }
  return lastPage > 1 &&

  <React.Fragment>

    <div onClick={handleChange} className="uk-flex uk-flex-center uk-flex-wrap uk-flex-middle uk-flex-none">

      {page > firstPage && <PrevButton page={page}/>}

      {page > 5 && lastPage >= 10 && <PageButton pageNo={firstPage} page={page}/>}

      {page > 5 && lastPage > 10 && <Filler/>}

      {visibleButtons.map(pageNo => <PageButton pageNo={pageNo} page={page} key={pageNo}/>)}

      {page < lastPage - 4 && lastPage > 10 && <Filler/>}

      {page < lastPage - 4 && lastPage >= 10 && <PageButton pageNo={lastPage} page={page}/>}

      {page < lastPage && <NextButton page={page}/>}

    </div>

    <SelectPage
      handleChange={handleChange}
      jumpToPage={jumpToPage}
      page={page}
      lastPage={lastPage}
    />

  </React.Fragment>
}

export default PageButtons
