$(document).ready(() => {
  $('#searchForm').on('submit', e => {
    e.preventDefault();
    let searchText = $('#searchText').val();
    searchMovies(searchText);
  });
  $('#discoverMovies').on('click', e => {
    e.preventDefault();
    discoverMovies();
  });
});

const searchMovies = searchText => {
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=6521b98734f61e4d1ef2d62365896a88&language=en-US&query=${searchText}&page=1&include_adult=false`
    )
    .then(res => {
      //   console.log(res);
      let movies = res.data.results;
      let output = '';
      var imdbID;
      $.each(movies, (index, movie) => {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=6521b98734f61e4d1ef2d62365896a88&language=en-US`
          )
          .then(res => {
            // console.log(res.data.imdb_id);
            return (imdbID = res.data.imdb_id);
          })
          .catch(errr => console.log(errr));
        // console.log(movie);
        if (movie.poster_path) {
          output += `
            
            <div class="col-md-3 mb-3">
            <div class="well text-center">
            <!-- <img src="https://image.tmdb.org/t/p/original${movie.poster_path}"/> -->
            <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}"/>
            <h5>${movie.title}</h5>
            <button type="button" onclick="movieSelected('${movie.id}')" class="btn btn-primary">Movie details</button>
            </div>
            </div>
            
            `;
          //   console.log(imdbID);
        } else {
          output += `
            
            <div class="col-md-3">
            <div class="well text-center">
            <!-- <img src="https://image.tmdb.org/t/p/original${movie.poster_path}"/> -->
            <img src="//via.placeholder.com/185x278"/>
            <h5>${movie.title}</h5>
            <button type="button" onclick="movieSelected('${movie.id}')" class="btn btn-primary">Movie details</button>
            </div>
            </div>
            
            `;
        }
      });
      $('#movies').html(output);
    })
    .catch(err => console.log(err));
};

const discoverMovies = () => {
  axios
    .get(
      `https://api.themoviedb.org/3/discover/movie?api_key=6521b98734f61e4d1ef2d62365896a88&language=en-US&page=1&include_adult=false`
    )
    .then(res => {
      //   console.log(res);
      let movies = res.data.results;
      let output = '';
      var imdbID;
      $.each(movies, (index, movie) => {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=6521b98734f61e4d1ef2d62365896a88&language=en-US`
          )
          .then(res => {
            // console.log(res.data.imdb_id);
            return (imdbID = res.data.imdb_id);
          })
          .catch(errr => console.log(errr));
        // console.log(movie);
        if (movie.poster_path) {
          output += `
          
          <div class="col-md-3 mb-3">
          <div class="well text-center">
          <!-- <img src="https://image.tmdb.org/t/p/original${movie.poster_path}"/> -->
          <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}"/>
          <h5>${movie.title}</h5>
          <button type="button" onclick="movieSelected('${movie.id}')" class="btn btn-primary">Movie details</button>
          </div>
          </div>
          
          `;
          //   console.log(imdbID);
        } else {
          output += `
          
          <div class="col-md-3">
          <div class="well text-center">
          <!-- <img src="https://image.tmdb.org/t/p/original${movie.poster_path}"/> -->
          <img src="//via.placeholder.com/185x278"/>
          <h5>${movie.title}</h5>
          <button type="button" onclick="movieSelected('${movie.id}')" class="btn btn-primary">Movie details</button>
          </div>
          </div>
          
          `;
        }
      });
      $('#movies').html(output);
    })
    .catch(err => console.log(err));
};

const getMovie = () => {
  let movieId = sessionStorage.getItem('movieId');
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=6521b98734f61e4d1ef2d62365896a88&language=en-US`
    )
    .then(res => {
      console.log(res);
      let movie = res.data;
      let output = `
        <div class="row mb-4 container">
            <div class="col-lg-4 col-md-6">
                <img src="https://image.tmdb.org/t/p/w500${
                  movie.poster_path
                }" class="thumbnail img-fluid"/>
            </div>
            <div class="col-lg-8 col-md-6">
                <h2 class="mb-4">${movie.title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.genres.map(
                      gen => {
                        return ` ${gen.name}`;
                      }
                    )}</li>
                    <li class="list-group-item"><strong>TagLine:</strong> ${
                      movie.tagline
                    }</li>
                    <li class="list-group-item"><strong>Released:</strong> ${
                      movie.release_date
                    }</li>
                    <li class="list-group-item"><strong>Budget:</strong> ${
                      movie.budget
                    }</li>
                    <li class="list-group-item"><strong>Language:</strong> ${
                      movie.original_language
                    }</li>
                    <li class="list-group-item"><strong>Average Rating:</strong> ${
                      movie.vote_average
                    }</li>
                    
                    <li class="list-group-item"><strong>Homepage:</strong> <a target="_blank" href="${
                      movie.homepage
                    }">${movie.homepage}</a></li>
                    <li class="list-group-item"><a class="btn btn-success" target="_blank" href="https://database.gdriveplayer.us/player.php?imdb=${
                      movie.imdb_id
                    }">Watch Movie</a><div><small> **It will open in a new tab. No ads if you have AdblockPlus.</small></div><div><small>**Possibly one if you don't have adblock</small></div></li>
                </ul>
            </div>
            <div class="container card card-body mb-5 mt-3">
            <div class="row">
              <div class="col-md-10 container mb-3"
                <div class="well">
                  <h3 class="card-title">Plot</h3>
                  <p class="card-body">${movie.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      $('#movie').html(output);
    })
    .catch(err => console.log(err));
};

const movieSelected = id => {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
};
