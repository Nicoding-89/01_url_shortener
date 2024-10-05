import React from 'react'

const ErrorAlert = ({ error }) => {
  return (
    <>
      <div className="alert alert-danger">{error}</div>
    </>
  )
}

export default ErrorAlert
