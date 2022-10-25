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
  
    let cityData = await axios.get(url)
  
    console.log(cityData.data[0]);
    this.setState({
      cityData: cityData.data[0],
      err: false,

  })

  } catch(err){
    console.log(err);
    this.setState({
      err:true,
      errMessage: err.config.message,

    })
  }

}

render (){
  // let cityItems = this.state.cityData.map((city, index) =>{
  //   return <li key={index}>{city.name}</li>
  // })
  return(
    <>
    <h1>API Call</h1>
    <form>
      <button>Search!</button>
    </form>
    
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
    }
    </>
  )
}
}
export default App;
