let trendingdiv = document.getElementById("trendingdiv");
let genreobj = {};

function fetchgenre() {
  fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=f38264d734411d70ce25ec5340df0e04&language=en-US`
  )
    .then((response) => response.json())
    .then((data) => getgenres(data.genres))
    .catch((error) => console.log(error));
}

fetchgenre();

function getgenres(data) {
  for (let i = 0; i < data.length; i++) {
    let num = data[i].id;
    genreobj[num] = data[i].name;
  }
  return genreobj;
}

function fetchtrending() {
  fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=f38264d734411d70ce25ec5340df0e04`
  )
    .then((response) => response.json())
    .then((data) => appendtrending(data.results))
    .catch((error) => console.log(error));
}

fetchtrending();

function appendtrending(data) {
  trendingdiv.innerHTML = null;
  data.map((elem, ind) => {
    let Title = document.createElement("h2");
    Title.innerText = "Title: " + elem.original_title;

    let Plot = document.createElement("p");
    Plot.innerText = "Plot: " + elem.overview;

    let Runtime = document.createElement("p");
    Runtime.innerText = "Rating: " + elem.vote_average;

    let genrearr = [];
    let genarr = elem.genre_ids;
    genarr = genarr.map((el) => genreobj[el]);

    let Genre = document.createElement("p");
    Genre.innerText = "Genre: " + genarr;

    let Director = document.createElement("p");
    Director.innerText = "Release Date: " + elem.release_date;

    let poster = document.createElement("img");
    poster.src = `https://image.tmdb.org/t/p/original${elem.poster_path}`;

    let info = document.createElement("div");
    info.append(Title, Plot, Runtime, Genre, Director);
    info.setAttribute("class", "info");

    let container = document.createElement("div");
    container.setAttribute("id", "container");
    container.style.display = "flex";
    container.append(poster, info);
    trendingdiv.append(container);
  });
}
