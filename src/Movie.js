import React from 'react';
// Help from https://medium.com/@gpj/making-api-calls-with-react-2e2378acb3ed


class Movie extends React.Component {
  render() {
    return (
      <div>
        <center><h1>Films</h1></center>
    {this.props.movieInfo.map((film, index) => (
      <div class="card-body">
        <img src={`https://image.tmdb.org/t/p/w200/${film.img}`} alt="{film.title}"/>
        <h2 class="card-title">Title: {film.title}</h2>
        <p class="card-text">Overview: {film.overview}</p>
        <p class="card-text2">Popularity: {film.popularity}</p>
        <p class="card-text3">Release Date: {film.release_date}</p>
          </div>     
      ))}
      </div>
    );
}
}

export default Movie;