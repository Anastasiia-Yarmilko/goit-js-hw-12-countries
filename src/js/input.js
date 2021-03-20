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

};