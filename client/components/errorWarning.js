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
    <span>{errorMessage}</span>
  )
}

export default ErrorWarning
