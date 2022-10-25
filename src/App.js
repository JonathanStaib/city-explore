import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cityData: [],
      city: '',
      err: false,
      errMessage:'',
      lat: '',
      lon:'',

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

getCityData = async (e) =>{
  e.preventDefault();

  try{
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
  
    let cityData = await axios.get(url);
    let lon = cityData.data[0].lon;
    let lat = cityData.data[0].lat;
    
    console.log(cityData.data[0]);
    this.setState({
      cityData: cityData.data[0],
      err: false,
      lon: lon,
      lat: lat,
  })

  } catch(err){
    console.log(err);
    this.setState({
      err:true,
      errMessage: err.config.message,

    })
  }

}

getMapData = async (e)=>{
  e.preventDefault();

  // let Url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=10`
  try{

  } catch{

  }
}

render (){
  // let cityItems = this.state.cityData.map((city, index) =>{
  //   return <li key={index}>{city.name}</li>
  // })
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
      this.state.err ? 
      <p>{this.state.errMessage}</p>
      :
      <>
      <ul>
        <li>
        City: {this.state.cityData.display_name}
        </li>
        <li>
        latitude: {this.state.cityData.lat}
        </li>
        <li>
        longitude: {this.state.cityData.lon}
        </li>
      </ul>
      <section>
      <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=10`} alt={this.state.cityData.display_name}/>
      </section>
      </>
    }
    </>
  )
}
}
export default App;
