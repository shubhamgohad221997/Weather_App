import axios from 'axios'
import React, { useEffect, useState } from 'react'
import WeatherIcon from 'react-open-weather-icons'
import "./Main.css"

const Main = () => {

    const [data7, set7Day]=useState([])
    const [data,setData]=useState([])
    const [city, setCity]=useState("pune")


    function getData(city){
    
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5881c4a70f1f474bc5289105d70aa1b5`)
        .then((res)=>{
            setData(res.data )
        })
        .catch((err)=>{
            console.log("err",err)
        })
    
    
    }




function get7Day(lat,lon){
    
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=5881c4a70f1f474bc5289105d70aa1b5`)
    .then((res)=>{
        set7Day(res.data.daily )
    })
    .catch((err)=>{
        console.log("err",err)
    })


}
// setCity("pune")
getData(city)
console.log("data1",data)

useEffect(()=>{
    
    get7Day(19.9975,73.7898)
})

  return (
    <div>
        <div className='mainBox'>

            <div className='d7day'>
                {
                    data7.map((e)=>(
                        <div className='d7day1'>
                        <WeatherIcon name={e.weather[0].icon} className="icon" />
                        <h4 className='icon2'>{e.weather[0].main}</h4>
                        <h4>Temperature:{Math.round(e.temp.day -273)}°C</h4>
                        <h4>Max Temp:{Math.round(e.temp.max -273)}°C</h4>
                        <h4>Min Temp:{Math.round(e.temp.min -273)}°C</h4>
                     
                        
                        </div>
                    ))
                }


            </div>


            <div className='main2'>


            </div>
      
      
      </div>
    </div>
  )
}

export default Main
