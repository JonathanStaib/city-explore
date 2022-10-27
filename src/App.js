import './App.css';
import React from 'react';
import axios from 'axios';
import Weather from './Weather';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cityData: [],
      city: '',
      error: false,
      errorMessage:'',
      lat: '',
      lon:'',
      weatherData: [],

    }
  }

// handleGetCity = (e)=>{
//   e.preventDefault();
//   let cityData = await axios.get();

//   console.log(cityData.data);
//   this.setState({
//     citynData: cityData.data.results,

//   })
// }

handleInput = (e)=> {
  e.preventDefault();
  this.setState({
    city: e.target.value
  })
}

handleSubmit = async (e) =>{
  e.preventDefault();
}

getCityData = async (e) =>{
  e.preventDefault();

  try{
    let locationUrl = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
  
    let cityData = await axios.get(locationUrl);
    let cityToDisplay = cityData.data[0];
    let lon = cityData.data[0].lon;
    let lat = cityData.data[0].lat;
    
    console.log(cityData.data[0]);

    
    this.setState({
      cityData: cityToDisplay,
      error: false,
      lon: lon,
      lat: lat,
    })
    this.getWeatherData(cityToDisplay);
    
  } catch(error){
    console.log(error);
    this.setState({
      error:true,
      errorMessage: "That is not a Location",

    })
  }

}

getMapData = async (e)=>{
  e.preventDefault();

  // let Url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=10`
}
getWeatherData= async (location)=> {
  try{
    let weatherUrl = `${process.env.REACT_APP_SERVER}/key?cityName=${this.state.city}&lat=${location.lat}&lon=${location.lon}`;
    console.log(weatherUrl);
    let weatherData = await axios.get(weatherUrl);
    console.log(weatherData);
    
    this.setState({
      weatherData: weatherData.data
    });
    console.log(weatherData);
  } catch(error){
    this.setState({
      error: true,
      errorMessage: error.message
    });
  }
}

render (){
  
  return(
    <>
    <h1>Find A City</h1>
    
      {/* {CityItems} */}

      <form onSubmit={this.getCityData}>
        <label>
          <input type="text" onInput={this.handleInput}/>
          <button type='submit'>Explore!</button>
        </label>
    </form>
    
    {
      this.state.error ? 
      <p>{this.state.errorMessage}</p>
      :
      <>
      <ul>
        <li>
        City: {this.state.cityData.display_name}
        </li>
        <li>
        Latitude: {this.state.cityData.lat}
        </li>
        <li>
        Longitude: {this.state.cityData.lon}
        </li>
      </ul>
      <section>
      <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=10`} alt={this.state.cityData.display_name}/>
      </section>
      <Weather
        weatherData={this.state.weatherData}
      />
      </>
    }
    </>
  )
}
}
export default App;
