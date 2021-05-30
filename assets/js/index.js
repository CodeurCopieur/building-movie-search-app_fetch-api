const loaderEl = document.querySelector('.component-search__loader');
const inputEl = document.querySelector('.component-search__input');
const resultsEl = document.querySelector('.component-search__results-list');
const counterEl = document.querySelector('.component-search__counter');

let currentPage = 1;
let totalResults;
let movies;


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
      console.log(data, totalResults, data.results);
      return data.results;
    }
  })
  .catch( error => {
    console.log(error);
  })
}

const previewSearch = async({target}) => {
  loaderEl.classList.remove('is-active');

  if(target.value.trim().lenght === 0) {
    return;
  }
  if(target.value.length > 2) {
    loaderEl.classList.add('is-active');
    await fetchSearch(target.value);
  }
}

window.addEventListener('load', () => {
  inputEl.addEventListener('keyup', previewSearch);
})


