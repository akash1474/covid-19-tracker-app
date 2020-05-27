import { CountUp } from 'countup.js';
import { elements } from './base';
import Control from '../Control';
import { storeData } from '../app';

export const renderCountries = (data, full = 'N') => {
    const container = document.querySelector('.countries__container');
    var countries = data.slice(5, -1);
    if (full === 'N') {
        countries = data.slice(0, 5);
    }
    countries.forEach((country) => {
        const el = `
    <a href="#${country.country}">
    <div class="countries__country">
          <div class="countries__country--header">
          <img src="${country.countryInfo.flag}" style="border-radius:5px" alt="" class="countries__country--header--img" />
          <p class="countries__country--header--name">${country.country}</p>
          </div>
          <div class="countries__country--data">
            <div class="countries__country--data--part">
            <p class="countries__country--data--part--title" style="color: #A18CD1;">Cases</p>
            <p class="countries__country--data--part--info">${country.cases}</p>
            </div>
            <div class="countries__country--data--part">
            <p class="countries__country--data--part--title" style="color:#ffa5a5">Deaths</p>
              <p class="countries__country--data--part--info">${country.deaths}</p>
              </div>
            <div class="countries__country--data--part">
            <p class="countries__country--data--part--title" style="color:#4ce9a3;">Recovered</p>
            <p class="countries__country--data--part--info">${country.recovered}</p>
            </div>
            </div>
            </div>
            </a>
        `;
        container.insertAdjacentHTML('beforeend', el);
    });
    if (full === 'Y') {
        const el = `<p id="homePageBtn">Goto Homepage</p>`;
        container.insertAdjacentHTML('beforeend', el);
        document.getElementById('homePageBtn').addEventListener('click', () => {
            document.getElementById('homePageBtn').style.display = 'none';
            storeData();
            Control.setState('homepage');
        });
    }
};

export const renderCountry = (data, prov, rankList, id) => {
    var rank;
    if (prov.length > 2) {
        rank = rankList.findIndex((el) => el.country.toLowerCase() === prov.toLowerCase());
    } else {
        rank = rankList.findIndex((el) => el.countryInfo.iso2.toLowerCase() === prov.toLowerCase());
    }
    const el = `
    <div class="user__country--header">
    <div class="user__country--header--img" 
    style="background:url(${data.countryInfo.flag});
    background-size:cover;border-radius:5px"></div>
    <p class="user__country--header--name">${data.country}</p>
    <div class="user__country--header--rank">
    <p class="user__country--header--rank--title">Global Rank</p>
          <p class="user__country--header--rank--data">${rank + 1}</p>
          </div>
          </div>
          <div class="user__country--section">
        <div class="user__country--section--title">Total</div>
        <div class="user__country--section--group" style="background: #E2B4FF;">
        <div class="user__country--section--group--part">
            <p class="user__country--section--group--part--title">Cases</p>
            <p class="user__country--section--group--part--info">${data.cases}</p>
            </div>
            <div class="user__country--section--group--part">
            <p class="user__country--section--group--part--title">Deaths</p>
            <p class="user__country--section--group--part--info">${data.deaths}</p>
            </div>
          <div class="user__country--section--group--part">
          <p class="user__country--section--group--part--title">Recovered</p>
          <p class="user__country--section--group--part--info">${data.recovered}</p>
          </div>
          </div>
      </div>
      <div class="user__country--section">
      <div class="user__country--section--title">Today</div>
        <div class="user__country--section--group" style="background: #4ce9a3;">
        <div class="user__country--section--group--part">
            <p class="user__country--section--group--part--title">Cases</p>
            <p class="user__country--section--group--part--info">${data.todayCases}</p>
          </div>
          <div class="user__country--section--group--part">
            <p class="user__country--section--group--part--title">Deaths</p>
            <p class="user__country--section--group--part--info">${data.todayDeaths}</p>
          </div>
          <div class="user__country--section--group--part">
            <p class="user__country--section--group--part--title">Recovered</p>
            <p class="user__country--section--group--part--info">0</p>
            </div>
            </div>
      </div>
      <div class="user__country--critical">
        <p class="user__country--critical--title">Critical Cases</p>
        <p class="user__country--critical--info">${data.critical}</p>
        </div>`;
    document.querySelector(`.${id}`).innerHTML = el;
};

export const renderGlobal = () => {
    const el = `
  <p class="global__title">Global Info</p>
  <div class="global__info" style="background: linear-gradient(90deg, #A18CD1 0%, #FBC2EB 100%);">
  <p class="global__info--title">Confirmed Cases</p>
  <p class="global__info--data" id="globalCases"></p>
      </div>
      <div
      class="global__info"
        style="background: linear-gradient(90deg, #F78CA0 0%, #F9748F 19%, #FD868C 60%);"
        >
        <p class="global__info--title">Deaths</p>
        <p class="global__info--data" id="globalDeaths"></p>
        </div>
        <div class="global__info" style="background: linear-gradient(109.73deg, #02B365 0%, #12EFA9 100%);">
        <p class="global__info--title">Recovered</p>
        <p class="global__info--data" id="globalRecovered"></p>
        </div>`;
    document.querySelector('.global').innerHTML = el;
};
export const renderCountUp = (el, value, options = {}) => {
    var countUp = new CountUp(el, value, options);
    countUp.start();
};
