const loaderEl = document.querySelector('.component-search__loader');
const inputEl = document.querySelector('.component-search__input');
const resultsEl = document.querySelector('.component-search__results-list');
const counterEl = document.querySelector('.component-search__counter');

let currentPage = 1;
let totalResults;
let movies;

const renderResults = (movies) => {
  resultsEl.innerHTML = (
    movies.map( movie => (
      `
        <li class="component-search__wrap-movie" data-genres="${movie.genre_ids}">
          <div class="component-search__wrap-picture">
              <picture>
                <img src="https://www.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}" alt="">
              <picture>
          </div>
          <div class="component-search__wrap-texts">
            <h3 class="component-search__wrap-title">${movie.original_title}</h3>
            <p></p>
          </div>
        </li>
      `
    )).join('')
  )
};

const renderResponse = response => {
  loaderEl.classList.remove('is-active');
  counterEl.innerHTML = `${response.length} resultats`;

  response ? renderResults(response) : null;
};

const fetchSearch = async(value) =>{

  const apiKey = 'cc4c125990f5777406886df6fdb3e266';
  const apiUrl = 'https://api.themoviedb.org/3'
  const urlSuffix = '/search/movie';

  const url = `${apiUrl}${urlSuffix}?api_key=${apiKey}&language=en-US&query=${value}&page=${currentPage}&include_adult=false`;


  await fetch(url)
  .then( data => data.json())
  .then( data =>  {
    
    if(data){

      totalResults = data.total_results;
      movies = data.results.map( element => element );
      movies ? renderResponse(movies) : null;

    }
  })
  .catch( error => {
    console.log(error);
  })
};

const previewSearch = async({target}) => {
  loaderEl.classList.remove('is-active');
  counterEl.innerHTML = '';

  if(target.value.trim().length === 0) {
    return;
  }

  if(target.value.length > 2) {
    loaderEl.classList.add('is-active');
    await fetchSearch(target.value);
  }
};

window.addEventListener('load', () => {
  inputEl.addEventListener('keyup', previewSearch);
});


