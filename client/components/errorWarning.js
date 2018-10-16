import React from 'react'

const ErrorWarning = props => {
  const {error} = props
  let errorMessage = ``
  if(error === `Request failed with status code 400`){
    errorMessage = `Invalid city name, please try a different city`
  }else{
    errorMessage = `We're sorry, there was an error. Please try again.`
  }
  return (
    <div id="error" className="uk-flex uk-flex-center uk-flex-middle">
      <span className="uk-text-danger uk-text-center uk-text-large">
        {errorMessage}
      </span>
    </div>
  )
}

export default ErrorWarning
