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

const refs = {
    input: document.querySelector('.search-fild'),
    searchResults: document.querySelector('.search-results')
}

const handleInput = event => {
    refs.searchResults.innerHTML = '';
    const countrySearchTitle = event.target.value;
    fetchCountries(countrySearchTitle).then(result => {
        if (result.lengh >= 10) {
            alert({
                text: 'Too many matches found. Please enter a more specific query!',
                type: 'error',
                delay: 2000,
                stack: new Stack({
                    dir1: 'up',
                }),
            })
        }

        if (result.length < 10 && results.length >= 2) {
            refs.searchResults.insertAdjacentHTML(
                'beforeend', createListOfCountries(result)
            );
        };

        if (result.lengh === 1) {
            refs.searchResults.insertAdjacentHTML(
                'beforeend', createCountryCard(result)
            );
        }
    }).catch(console.log);
}

function createListOfCountries(result) {
    const template = '<ul class="country-list">' + result.reduce((acc, item) => {
        acc += `<li>${item.name}</li>`;
        return acc;
    }, '') + '</ul>';
    return template;
};
    
function createCountryCard(result) {
    const language = result[0].languages.reduce((acc, item) => {
        acc += `<li>${item.name}</li>`;
        return acc;
    }, '');

    const countryCard = `<h2 class='country-name'>${data[0].name}</h2>
        <div class='country-card'><div class='country-properties'>
        <p><span class='country-property'>Capital: </span>${data[0].capital}</p>
        <p><span class='country-property'>Population: </span>${data[0].population}</p>
        <h3 class='country-property'>Languages:</h3><ul>${language}</ul></div>
        <img height='500px' src="${data[0].flag}" alt="flag of coutnry"></img></div>`;
    return countryCard;
};

refs.input.addEventListener('input', debounce(handleInput, 500));