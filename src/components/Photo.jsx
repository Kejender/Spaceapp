import React from 'react'

const Photo = ({ photo, changeText2 }) => {

  console.log("photo", photo)

    return (
      <div className='spacephoto' onClick={changeText2}>
        <img src={photo} id="photo"/>
      </div>
    )
}

export default Photo