import axios from 'axios'

// Getting dates of today and yesterday and formatting them
// for API call although in fact they are not used now

let datetoday = Date.now()
let dateyesterday = datetoday - 86400000;
let ydate = new Date(dateyesterday) 

console.log("YESTERDAY "+ydate)
console.log("TODAY "+datetoday)
let time = new Date().getTime()
let date = new Date(time)

console.log("DATE1 "+date)
console.log("DATE2 "+date.getDate())

let ydnumber = ydate.getDate()//

if (ydnumber < 10) {
  ydnumber = '0'+ydnumber;
}

let ymonth = ydate.getMonth()+1

if (ymonth < 10) {
  ymonth = '0'+ymonth;
}

console.log("MONTH "+ymonth)

let yyear = ydate.getFullYear();

let dnumber = date.getDate()//

if (dnumber < 10) {
  dnumber = '0'+dnumber;
}

let month = date.getMonth()+1

if (month < 10) {
  month = '0'+month;
}

let year = date.getFullYear();

//let mm = (M=this.getMonth()+1)<10?('0'+M):M;
//console.log(dnumber+" "+month+" "+year)
console.log(`YESTERDAY2 ${ydnumber} ${ymonth} ${yyear}`)
console.log(`TODAY2 ${dnumber} ${month} ${year}`)

let yesterday = (`${yyear}-${ymonth}-${ydnumber}`)
let today = (`${year}-${month}-${dnumber}`)

console.log(yesterday)
console.log(today)

//const baseUrl = `https://api.nasa.gov/DONKI/notifications?startDate=${yesterday}&endDate=${today}&type=all&api_key=`+process.env.SPACEKEY
const baseUrl = `https://api.nasa.gov/DONKI/notifications?&type=all&api_key=`+process.env.SPACEKEY
const getWeather = () => {
  console.log("getweather")
  return axios.get(baseUrl)
}

export default { 
  getWeather: getWeather, 
}