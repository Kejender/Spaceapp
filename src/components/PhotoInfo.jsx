import React from 'react'

const PhotoInfo = ({ photoinfo, toggleText, changeText, changeText2 }) => {

  changeText(true)
  console.log("photo", photoinfo.media_type, toggleText)

  if (photoinfo.media_type === 'video'){
    return (
      <div className='photoinfoIn visible' id='photoinfo'>
          <h3>{photoinfo.title}</h3>
          <p>{photoinfo.copyright} {photoinfo.date}</p>
          <p>{photoinfo.explanation}</p>
          <p><a href={photoinfo.url}>Video</a></p>
        </div>
    )

  } else{

    return (
      <div className='photoinfoIn visible' id='photoinfo'>
          <h3>{photoinfo.title}</h3>
          <p>{photoinfo.copyright} {photoinfo.date}</p>
          <p>{photoinfo.explanation}</p>
        </div>
    )
  }
}

export default PhotoInfo