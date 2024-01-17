import React from 'react'

const Info = ({ hideInfo, aboutcomponent }) => {

  console.log("info")
    return (
      <div className='aboutOut hidden' id='about' onClick={hideInfo}>
          <h3>Hi!</h3>
          <p>This is an app showing Nasa's Astronomy picture of the day. As well as a summary of the latest space weather report. </p>
          <p>Note that sometimes the day's picture is in fact a video link. It should be shown as a link in the other text box.
            A bit of mobile optimazion coming up.
          </p>
          <p>More of this later!</p>
        </div>
    )
}

export default Info