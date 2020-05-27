export const elements = {
    searchBar: document.getElementById('searchBar'),
    searchBtn: document.getElementById('header__search--icon'),
    globalSection: document.querySelector('.global'),
    countriesContainer: document.querySelector('.countries__container'),
    countriesTitle: document.querySelector('.countries__title'),
    countrySection: document.querySelector('.user__country'),
    countriesSection: document.querySelector('.countries'),
    headerAdvice: document.querySelector('.header__advice'),
    countryTitle: document.querySelector('.user__country--title'),
    countryInfo: document.querySelector('.country__info'),
    resultsContainer: document.querySelector('.header__searchResults'),
    moreBtn: document.getElementById('moreBtn'),
};

export const renderLoader = (el) => {
    const loader = `<img src="./icons/gooeyLoader.svg" class="loader">`;
    el.innerHTML = loader;
};

export const clearLoader = (el) => {
    el.innerHTML = '';
};
