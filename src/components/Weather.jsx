import React from 'react'

const Weather = ({ weather }) => {

  return (
    <div className='wmessage'>
    <p>{weather}</p>
    </div>
  )
}

export default Weather