import Info from './models/Info';
import * as infoView from './views/infoView';
import { elements, renderLoader, clearLoader } from './views/base';
import Control from './Control';
// import Chart from "chart.js";
// import lottie from "lottie-web";
const state = {};

// var animation = lottie.loadAnimation({
//   container: document.getElementById("name"),
//   render: "svg", FIXME
//   loop: true,
//   autoplay: true,
//   path: "../icons/home.json"
// });
export const storeData = async () => {
    //Find other way to automate the user country
    //   navigator.geolocation.getCurrentPosition(data => {
    //     state.coords = data.coords;
    //   });
    // BUG
    renderLoader(elements.globalSection);
    renderLoader(elements.countriesContainer);
    state.global = await new Info().getGlobal();
    state.global.history = await new Info('all').getHistory();
    state.india = await new Info().getIndia();
    state.indian = Object.entries(state.india).map((e) => ({
        [e[0]]: e[1],
    }));
    state.countries = await new Info().getCountries();
    state.countries.sort((a, b) => b.cases - a.cases);
    state.india.all = await new Info().getIndiaAll();
    state.userCountry = await new Info('IN').getCountry();
    console.log(state);
    clearLoader(elements.globalSection);
    infoView.renderGlobal();
    const globalElements = {
        globalCases: document.getElementById('globalCases'),
        globalDeaths: document.getElementById('globalDeaths'),
        globalRecovered: document.getElementById('globalRecovered'),
    };
    infoView.renderCountUp(globalElements.globalCases, state.global.cases, {
        duration: 4,
        useEasing: true,
    });
    infoView.renderCountUp(globalElements.globalDeaths, state.global.deaths, {
        duration: 4,
        useEasing: true,
    });
    infoView.renderCountUp(globalElements.globalRecovered, state.global.recovered, {
        duration: 4,
        useEasing: true,
    });

    clearLoader(elements.countriesContainer);
    infoView.renderCountries(state.countries, 'N');
    infoView.renderCountry(state.userCountry, 'IN', state.countries, 'user__country');
};
storeData();
// Still to be develope TODO
const searchCountry = async (query) => {
    Control.setState('countryInfo');
    state.country = await new Info(query).getCountry();
    elements.searchBar.value = '';
    renderCountryInfo(query);
};

const renderCountryInfo = async (query) => {
    if (query) {
        elements.countryInfo.innerHTML = '';
        renderLoader(elements.countryInfo);
        state.country = await new Info(query).getCountry();
        state.country.history = await new Info(query).getHistory();
        clearLoader(elements.countryInfo);
        infoView.renderCountry(state.country, query, state.countries, 'country__info');
        window.location.hash = '';
    }
};

elements.searchBtn.addEventListener('click', (e) => {
    if (elements.searchBar.value) {
        searchCountry(elements.searchBar.value);
    }
});
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        if (elements.searchBar.value) {
            searchCountry(elements.searchBar.value);
        }
    }
});
// elements.searchBar.addEventListener("focus", () => {
//   elements.resultsContainer.style.opacity = "1";
//   elements.resultsContainer.innerHTML = "";
//   elements.resultsContainer.style.border = "2px solid rgb(25, 221, 156)";
//   elements.resultsContainer.style.visibility = "";
// });
// //Solve the search Bar issue as well the infected countries issues
// elements.searchBar.addEventListener("blur", () => {
//   elements.resultsContainer.style.border = "none";
//   elements.resultsContainer.style.visibility = "hidden";
// });
//TODO
// elements.searchBar.addEventListener("input", (e) => {
//   elements.resultsContainer.innerHTML = "";
//   if (e.target.value) {
//     Countries.forEach((el) => {
//       if (el.name.toLowerCase().indexOf(e.target.value) > -1) {
//         const list = `<p class="header__result" data-iso=${el.code}>${el.name}</p> `;
//         elements.resultsContainer.insertAdjacentHTML("beforeend", list);
//         document.querySelector(".header__result").addEventListener("click", (e) => {
//           elements.resultsContainer.style.border = "none";
//           elements.resultsContainer.style.opacity = "0";
//           searchCountry(e.target.dataset.iso);
//           elements.resultsContainer.style.visibility = "hidden";
//         });
//       }
//     });
//   }
// });
elements.moreBtn.addEventListener('click', () => {
    Control.setState('countriesList');
    infoView.renderCountries(state.countries, 'Y');
});
elements.headerAdvice.addEventListener('click', () => {
    storeData();
    Control.setState('homepage');
});
window.addEventListener('hashchange', () => {
    Control.setState('countryInfo');
    const query = window.location.hash.slice(1, 60);
    renderCountryInfo(query);
});

// const renderChart = () => {
//   var data = {
//     labels: ["google", "akash", "india", "russia"], //Title
//     datasets: [
//       {
//         label: "Popularion",
//         data: [0, 5, 78, 54, 105],
//         backgroundColor: [
//           "rgba(255,99,132,0.7)",
//           "rgba(54,1662,235,0.7)",
//           "rgba(255,206,86,0.7)",
//           "rgba(75,192,192,0.7)"
//         ],
//         borderWidth: 3,
//         borderColor: "lightgreen",
//         hoverBorderWidth: 2,
//         hoverBorderColor: "#666",
//         fill: false
//       },
//       {
//         label: "Virus",
//         data: [20, 65, 78, 54, 15],
//         backgroundColor: [
//           "rgba(255,99,0,0.7)",
//           "rgba(54,1662,235,0.7)",
//           "rgba(255,206,86,0.7)",
//           "rgba(75,192,192,0.7)"
//         ],
//         borderWidth: 3,
//         borderColor: "red",
//         hoverBorderWidth: 2,
//         hoverBorderColor: "#666",
//         fill: false
//       }
//     ]
//   };
//   var options = {
//     responsive: true,
//     title: {
//       display: true,
//       text: "Increase in cases"
//     },
//     legend: {
//       labels: {
//         fontColor: "#666"
//       }
//     }
//   };
//   var ctx = document.getElementById("myChart").getContext("2d");
//   Chart.defaults.global.defaultFontFamily = "Montserrat";
//   Chart.defaults.global.defaultFontColor = "#666";
//   Chart.defaults.global.defaultFontSize = 18;
//   var myChart = new Chart(ctx, {
//     type: "line",
//     data: data,
//     options: options
//   });
// };
