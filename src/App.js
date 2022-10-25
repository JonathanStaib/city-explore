import './App.css';
import React from 'react';
// import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cityData: [],

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

// handleInput = (e)=> {
//   e.preventDefault();
//   this.setState({
//     city: e.target.value
//   })
// }

// getCityData = (e) =>{
//   e.preventDefault();

// }

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
    <ul>
      {/* {CityItems} */}
    </ul>
    </>
  )
}
}
export default App;
