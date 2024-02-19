import { useState, useEffect } from 'react'
//import axios from 'axios'
import PhotoService from './services/photoservice'
import WeatherService from './services/weatherservice'
import Photo from './components/Photo'
import PhotoInfo from './components/PhotoInfo'
import Weather from './components/Weather'
import Info from './components/Info'
import InfoButton from './components/InfoButton'
import defaultImage from './assets/default.svg'
import './App.css'

function App() {

  const [ spaceImage, setImage  ] = useState(defaultImage)
  const [ spaceImageInfo, setImageInfo  ] = useState('')
  const [ spaceWeather, setWeather  ] = useState([])
  const [ toggleText, changeText ] = useState([false])
  const [ infoVisible, setInfoVisible] = useState(true)
  const [ weatherVisible, setWeatherVisible] = useState(false)

  const weathercomponent = document.getElementById('weather');
  const photoinfocomponent = document.getElementById('photoinfo');
  const infoicon = document.getElementById('infoicon');
  const aboutcomponent = document.getElementById('about');

  var mediaQueryPort = window.matchMedia("(orientation: portrait)");
  var mediaQueryLand = window.matchMedia("(orientation: landscape)");
  var mediaQueryHeight = window.matchMedia('(min-height: 500px)');

  if (mediaQueryPort.matches){
    console.log("PORTRAIT "+window.screen.width+" "+window.screen.height);
  }

  if (mediaQueryLand.matches && window.screen.width > 599 && window.screen.height < 599){
    console.log("SMALLLANDSCAPE "+window.screen.width+" "+window.screen.height);
  }

  if (mediaQueryLand.matches && window.screen.width > 599 && window.screen.height > 599){
    console.log("BIGLANDSCAPE "+window.screen.width+" "+window.screen.height);
  }



const changeText2 = () => {
  console.log("CT")

  aboutcomponent.classList.replace("aboutIn", "aboutOut")
  aboutcomponent.classList.replace("visible", "hidden")

  // weather and photoinfo are hidden, show photoinfo
  if (!infoVisible && !weatherVisible) {
    console.log("1")
    setWeatherVisible(false)
    setInfoVisible(true)

    weathercomponent.classList.replace("weather", "weatherOut")
    photoinfocomponent.classList.replace("photoinfoOut", "photoinfoIn")
    photoinfocomponent.classList.replace("hidden", "visible")
    photoinfocomponent.classList.replace("photoinfoOut", "photoinfoIn")

    // weather is hidden, show weather
  } else if (!weatherVisible) {
    console.log("2")
    setWeatherVisible(true)

    weathercomponent.classList.replace("weatherOut", "weatherIn")
    weathercomponent.classList.replace("hidden", "visible")
    photoinfocomponent.classList.replace("photoinfoIn", "photoinfoOut")
    photoinfocomponent.classList.replace("visible", "hidden")

  // weather is shown, hide weather and show photoinfo
  } else if (weatherVisible){
    console.log("3")
    setWeatherVisible(false)
    setInfoVisible(false)

    weathercomponent.classList.replace("weatherIn", "weatherOut")
    photoinfocomponent.classList.replace("photoinfoIn", "photoinfoOut")
    weathercomponent.classList.replace("visible", "hidden")
    photoinfocomponent.classList.replace("visible", "hidden")
  }
}

const showInfo = () => {

  photoinfocomponent.classList.replace("photoinfoIn", "photoinfoOut")
  photoinfocomponent.classList.replace("visible", "hidden")
  weathercomponent.classList.replace("weatherIn", "weatherOut")
  weathercomponent.classList.replace("visible", "hidden")

  aboutcomponent.classList.replace("aboutOut", "aboutIn")
  aboutcomponent.classList.replace("hidden", "visible")
  console.log("info")
}

const hideInfo = () => {
  aboutcomponent.classList.replace("aboutIn", "aboutOut")
  aboutcomponent.classList.replace("visible", "hidden")
  console.log("hideinfo"+aboutcomponent)
}

const getReportIndex = (weatherarray) => {

  let weatherindex
  // The first item in the array is the most recent
  for(let i = 0; i < weatherarray.length; i++){
   // code
    if( weatherarray[i].messageType === 'Report' ){
      console.log(i)
      weatherindex = i
      break;
     }
   }
   return weatherindex
}

useEffect(() => {
  console.log('photoservice')
    PhotoService
    .getPhoto()
    .then(response => {
      console.log('promise fulfilled space', response.data)
      console.log("MEDIA "+response.data.media_type)

      // content type is image
      if (response.data.media_type === "image") {
        console.log("IMAGE")
        setImage(response.data.url)
      }
      // content type is video
      if (response.data.media_type === "video") {
        console.log("VIDEO")
        setImage(defaultImage)
      }

      const photo = document.getElementById('photo');
      const wrap = document.getElementById('textwrap');
      wrap.style.width = photo.clientWidth+"px"
      wrap.style.height = photo.clientHeight+"px"
      //infoicon.classList.replace("icon", "flip-box")
      console.log("WIDTH", photo.clientWidth, photo.clientHeight)

      setImageInfo(response.data)
      console.log(response.data.title)
      console.log("COPY "+response.data.copyright)
      console.log(response.data.date)
      console.log(response.data.explanation)
    })

}, [])

useEffect(() => {
  console.log('weatherservice')
    WeatherService
    .getWeather()
    .then(response => {
      console.log('weather promise fulfilled', response.data)
      console.log('type', response.data[1].messageType)

      // Checking whether there are report items in the array
      response.data.forEach(element => {
        if (element.messageType === 'Report'){
          console.log("Report")
        }
      });


      let reportIndex = getReportIndex(response.data)

      let paras = response.data[reportIndex].messageBody.split("##");
      console.log(paras.length)
      console.log("PARAS "+paras)
      
      function filterItems(arr, query) {
        return arr.filter((el) => el.includes(query));
      }
      
      console.log(filterItems(paras, "Outlook Coverage End Date"));

      let eventsitem = filterItems(paras, "Outlook Coverage End Date")
      eventsitem = eventsitem.toString()

      console.log("ei "+eventsitem)
      console.log(typeof(eventsitem))

      let eventparas = eventsitem.split("\n\n")

      console.log(eventparas.length)
      console.log(eventparas)

      eventparas.shift()
      eventparas.pop()
      console.log(eventparas)

      setWeather(eventparas)

    })

}, [])

  return (
    <>
      <div id="wrap">
      
      <div id="textwrap" className='textwrap'>
      <Photo photo={spaceImage} changeText2={changeText2}/>
        <PhotoInfo photoinfo={spaceImageInfo} toggleText={toggleText} changeText={changeText} changeText2={changeText2}/>
        <Info hideInfo={hideInfo} aboutcomponent={aboutcomponent}/>
        <div className='weatherOut hidden' id='weather'>
          <h3>Space weather</h3>
          {spaceWeather.map(weather => 
            <Weather key={weather.length} weather={weather} />
          )}
        </div>
        <InfoButton showInfo={showInfo}/>
      </div>

      </div>
    </>
  )
}

export default App
