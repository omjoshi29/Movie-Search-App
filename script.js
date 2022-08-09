let timerid;
let movies = document.getElementById("movies");
let container = document.getElementById("container");

async function searchMovie() {
  try {
    let input = document.getElementById("query").value;

    if (input.length === 0) {
      movies.style.display = "none";
      container.style.display = "none";
    }

    let res = await fetch(
      `https://www.omdbapi.com/?apikey=3e8b6eeb&s=${input}`
    );

    let data = await res.json();

    let moviesArr = data.Search;

    return moviesArr;

    //console.log(moviesArr);
  } catch (error) {
    console.log(error);
  }
}

async function movieDetails(ip) {
  try {
    let res = await fetch(`https://www.omdbapi.com/?apikey=3e8b6eeb&t=${ip}`);

    let data = await res.json();
    console.log("obj", data);

    appendmov(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}

function appendmovies(data) {
  movies.innerHTML = null;
  movies.style.display = "block";
  console.log(data);
  data.forEach(function (elem, index) {
    let p = document.createElement("p");

    p.innerText = elem.Title;
    p.style.cursor = "pointer";

    movies.style.display = "block";
    container.style.display = "none";
    movies.append(p);

    p.addEventListener("click", function () {
      console.log(elem);

      movieDetails(elem.Title);

      // movies.style.display = "none";

      // container.innerHTML = null;

      // console.log("obj:", obj);

      // let Title = document.createElement("h3");
      // Title.innerText = elem.Title;

      // let Year = document.createElement("p");
      // Year.innerText = elem.Year;

      // let Poster = document.createElement("img");
      // Poster.src = elem.Poster;

      // let box = document.createElement("div");
      // box.append(Poster, Title, Year);
      // container.style.display = "block";
      // container.append(box);
    });
  });
}

function appendmov(elem) {
  movies.style.display = "none";
  container.innerHTML = null;

  let Title = document.createElement("h2");
  Title.innerText = "Title: " + elem.Title;

  let Plot = document.createElement("p");
  Plot.innerText = "Plot: " + elem.Plot;

  let Runtime = document.createElement("p");
  Runtime.innerText =
    "Runtime: " +
    elem.Runtime +
    ", " +
    "Year: " +
    elem.Year +
    ", " +
    "Rating: " +
    elem.imdbRating;

  let Genre = document.createElement("p");
  Genre.innerText = "Genre: " + elem.Genre;

  let Director = document.createElement("p");
  Director.innerText = "Director: " + elem.Director;

  // let Year = document.createElement("p");
  // Year.innerText = "Year" + elem.Year;

  let Poster = document.createElement("img");
  Poster.src = elem.Poster;

  let info = document.createElement("div");
  info.append(Title, Plot, Runtime, Genre, Director);
  info.setAttribute("class", "info");

  // let box = document.createElement("div");
  // box.append(Poster, info);
  container.style.display = "flex";
  container.append(Poster, info);
}

async function main() {
  try {
    let data = await searchMovie();

    if (data === undefined) {
      return false;
    }

    appendmovies(data);
  } catch (error) {
    console.log(error);
  }
}

function debounce(func, delay) {
  if (timerid) {
    clearTimeout(timerid);
  }

  timerid = setTimeout(function () {
    func();
  }, delay);
}
