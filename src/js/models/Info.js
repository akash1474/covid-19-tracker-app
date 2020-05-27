import axios from 'axios';
export default class Info {
    constructor(country) {
        this.country = country;
        this.apiNews = `02b88cd0eecd48d79fc621501228f999`;
    }
    async getGlobal() {
        const data = await axios(`https://corona.lmao.ninja/v2/all`);
        return data.data;
    }
    async getCountries() {
        const data = await axios(`https://corona.lmao.ninja/v2/countries`);
        return data.data;
    }
    async getCountry() {
        const data = await axios(`https://corona.lmao.ninja/v2/countries/${this.country}`);
        return data.data;
    }
    async getHistory() {
        const data = await axios(`https://corona.lmao.ninja/v2/historical/${this.country}`);
        return data.data;
    }
    async getIndia() {
        const data = await axios(`https://api.covid19india.org/state_district_wise.json`);
        return data.data;
    }
    async getIndiaAll() {
        const data = await axios(`https://api.covid19india.org/data.json`);
        return data.data.statewise;
    }
    static async getCountryName(lat, long) {
        return await (await axios(`https://geocode.xyz/${lat},${long}?geoit=json`)).data.prov;
    }
}
