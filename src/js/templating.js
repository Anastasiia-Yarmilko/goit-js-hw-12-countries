import cardsTemplate from '../templates/menutemplate.hbs';
import cards from '../menu.json';

const markup = cardsTemplate(cards);
const galleryRef = document.querySelector('.js-menu');
galleryRef.insertAdjacentHTML('afterbegin', markup);