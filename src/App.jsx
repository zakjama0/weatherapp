import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

function App() {

//Input it stores from the user
//useState to update the value stored
// ifReq is invalid, send request for default url

// const [inputValue, setInputValue] = useState("")
const [newData, setNewData] = useState({fetchData})
const defaultURL = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=1db3baa7df6665872f06def359545c34&units=metric`
function handleInput (e){
  if (e.key === "Enter"){
    // setInputValue(e.target.value) was a test to see if 
    fetchData(e.target.value)
  }

}
function fetchData(inputValue){ // just pulls out the information
  if (inputValue){
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=1db3baa7df6665872f06def359545c34&units=metric`).then((response) =>{
    setNewData(response.data)
  }).catch((err) =>{
    if(err.response.status === 400){
      alert("invalid city")
    }
  })// axios is just a library
  }else{
    axios.get(defaultURL).then((response) =>{
      setNewData(response.data)
    })
  }
}
useEffect(() =>{
  fetchData()
  console.log(newData)
},[]
)

//
//https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid={API key}&units=metric
  return (
   <div className='wrapper'>
    <div className='wrap'>
      <input 
      className='input-box'
      placeholder='Enter City'
      onKeyDown={handleInput}
      />

      { newData ? <h1>{newData.name}</h1> : <h1></h1>} 
      { newData.main ? <h2>Temperature: {newData.main.temp}°C</h2>: <h2></h2>}
      { newData.main ? <h3>Feels Like: {newData.main.feels_like}°C</h3>: <h3></h3>}
      { newData.weather ? <h2>Weather Description: {newData.weather[0].main}</h2>: <h2></h2>} 
      { newData.main ? <h2>Humitity: {newData.main.humidity}%</h2>: <h2></h2>}
      { newData.weather ? <img src={`https://openweathermap.org/img/wn/${newData.weather[0].icon}@2x.png`} />: <h2></h2>}

      {/* A ternery conditional statement is used as a fail safe, if new data isnt provided then nothing will be  */}

    </div>
    </div>
  )
}

export default App