'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//https://countries-api-836d.onrender.com/countries/


// const getCountryData = function(country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
//     request.send();

//     request.addEventListener('load', function() {
//         const [data] = JSON.parse(this.responseText);
    
//         const html = `
//         <article class="country">
//               <img class="country__img" src="${data.flag}" />
//               <div class="country__data">
//                 <h3 class="country__name">${data.name}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}M people</p>
//                 <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//                 <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//               </div>
//             </article>
//         `
//         countriesContainer.insertAdjacentHTML('beforeend', html);
//         countriesContainer.style.opacity = 1;
    
//         console.log(data);
//     })

// }

// getCountryData('portugal');
// getCountryData('usa')

const renderError = function(msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    // countriesContainer.style.opacity = 1;
}

const renderCountry = function(data, className = '') {
    const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
    `
    countriesContainer.insertAdjacentHTML('beforeend', html);
    // countriesContainer.style.opacity = 1;

}

// const getCountryAndNeighbour = function(country) {

//     //AJAX call country 1
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
//     request.send();

//     request.addEventListener('load', function() {
//         const [data] = JSON.parse(this.responseText);

//         //Render Country 1
//         renderCountry(data);

//         //GET neighbour country
//         const neighbourCountry = data.borders?.[0];

//         //AJAX call country 2
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://countries-api-836d.onrender.com/countries/alpha/${neighbourCountry}`);
//         request2.send();

//         request2.addEventListener('load', function() {
//             const data2 = JSON.parse(this.responseText);
//             //Render Country 2
//             renderCountry(data2, 'neighbour');

//         })

        
    
//     })

// }

// getCountryAndNeighbour('portugal')


const getJSON = function(Url, errorMessage = `Something went wrong`) {
  return  fetch(Url).then((response)=> {
        if(!response.ok) {
            throw new Error(`${errorMessage} (${response.status})`);
        }
        return response.json()

    })
}

// const getCountryData = function(country) {
//     fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(function(response) { 
//         if(!response.ok) {
//             throw new Error(`Country could not found (${response.status})`);
//         }
//         return response.json()}
//     )
//     .then((data)=> { 
//         renderCountry(data[0]);
//         const neighbour = data[0].borders?.[0];

//         return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`)
//     }).then((response)=> {
//         if(!response.ok) {
//             throw new Error(`Neighbour could not found (${response.status})`);
//         }

//          return response.json();
//     }).then((data)=> {
//         renderCountry(data, 'neighbour')
//     }).catch( (err)=> {
//         console.error(err);
//         renderError(`Something went wrong, ${err.message}. Try again later !!!`)
//     }      
//     ).finally(()=> {
//         countriesContainer.style.opacity = 1; 
//     })
// }

const getCountryData = function(country) {
    getJSON(`https://countries-api-836d.onrender.com/countries/name/${country}`, 'Country could not found')
    .then((data)=> { 
        renderCountry(data[0]);
        const neighbour = data[0].borders?.[0];
        if(!neighbour) throw new Error('Neighbour not found')

        return getJSON(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`, 'Neighbour could not found' )
    })
    .then((data)=> {
        renderCountry(data, 'neighbour')
    }).catch( (err)=> {
        console.error(err);
        renderError(`Something went wrong, ${err.message}. Try again later !!!`)
    }      
    ).finally(()=> {
        countriesContainer.style.opacity = 1; 
    })
}

btn.addEventListener('click', function() {
    getCountryData('australia');
})