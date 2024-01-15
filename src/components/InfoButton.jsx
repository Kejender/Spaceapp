import React from 'react'
import infoBlack from '../assets/info.svg'
import infoWhite from '../assets/infow.svg'

const InfoButton = ({showInfo}) => {

    return (
        <div className="flip-box icon flip1" id="infoicon" onClick={showInfo}>
        < div className="flip-box-inner">
            <div className="flip-box-front">
              <img src={infoWhite}/>
            </div>
            <div className="flip-box-back">
              <img src={infoBlack}/>
            </div>
          </div>
        </div>
    )
}

export default InfoButton