import { elements } from "./views/base";
export default class Control {
  constructor() {}
  static setState(state) {
    switch (state) {
      case "homepage":
        elements.globalSection.style.display = "";
        elements.countrySection.style.display = "";
        elements.countriesSection.style.display = "";
        elements.countryTitle.style.display = "";
        elements.moreBtn.style.display = "";
        elements.countryTitle.innerHTML = "Your<br>Country Info";
        elements.countryInfo.style.display = "none";
        break;
      case "countriesList":
        elements.globalSection.style.display = "none";
        elements.countrySection.style.display = "none";
        elements.countriesSection.style.display = "";
        elements.countryTitle.style.display = "none";
        elements.moreBtn.style.display = "none";
        elements.countryInfo.style.display = "none";

        break;
      case "countryInfo":
        elements.globalSection.style.display = "none";
        elements.countrySection.style.display = "none";
        elements.countriesSection.style.display = "none";
        elements.countryTitle.style.display = "";
        elements.countryTitle.textContent = "Country Info";
        elements.moreBtn.style.display = "none";
        elements.countryInfo.style.display = "";
        break;
    }
  }
}
