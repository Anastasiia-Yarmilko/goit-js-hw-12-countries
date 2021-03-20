import debounce from 'lodash.debounce';
import { alert, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});
import fetchCountries from './fetchСountries.js';
import { defaults } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import { Stack } from '@pnotify/core';

defaults.styling = 'brighttheme';
defaults.icons = 'brighttheme';
defaults.closerHover = true;

const refsInput = document.querySelector('.search-field');
const refsSearchResults = document.querySelector('.search-results');

function displayCountries(event) {
    refsSearchResults.innerHTML = '';
    const countrySearchName = event.target.value;
    fetchCountries(countrySearchName)
        .then(results => {
            if (results.length > 10) {
                alert({
                    text: 'Too many matches found. Please enter a more specific query!',
                    type: 'error',
                    delay: 1000,
                    stack: new Stack({
                        dir1: 'up',
                    }),
                });
            }
            if (results.length >= 2 && results.length <= 10) {
                refsSearchResults.insertAdjacentHTML(
                    'beforeend',
                    createListCountriesTemplate(results),
                );
            };

            if (results.length === 1) {
                refsSearchResults.insertAdjacentHTML(
                    'beforeend',
                    createCountryPropertiesTemplate(results),
                    );
            };
        })
        .catch(console.log)
};

function createListCountriesTemplate(results) {
  const template =
  '<ul class="country-list">' +
  results.reduce((acc, item) => {
      acc += `<li>${item.name}</li>`;
      return acc;
    }, '') +
    '</ul>';
    return template;
}

function createCountryPropertiesTemplate(results) {
    const languageDisplay = results[0].languages.reduce((acc, item) => {
        acc += `<li>${item.name}</li>`;
        return acc;
    }, '');
    const templateCountry = `<h2 class='country-name'>${results[0].name}</h2>
    <div class='country-card'>
    <img width='500px' src="${results[0].flag}" alt="flag"></img>
    <div class='country-properties'>
    <p><span class='country-property'>Capital: </span>${results[0].capital}</p>
    <p><span class='country-property'>Population: </span>${results[0].population}</p>
    <h3 class='country-property'>Languages:</h3><ul>${languageDisplay}</ul></div></div>`;
    return templateCountry;
};

refsInput.addEventListener('input', debounce(displayCountries, 1000));
