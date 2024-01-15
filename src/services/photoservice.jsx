import axios from 'axios'
const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key='+process.env.SPACEKEY

const getPhoto = () => {
  console.log("getphoto")
  return axios.get(baseUrl)
}

export default { 
  getPhoto: getPhoto, 
}