const { getRequest } = require("../functions/httpRequests");
const { extractEssentialCountryInfo } = require("./helper");
require('dotenv').config();
const BASE_URL = process.env.BASE_URL;
const CustomError = require('../utils/errorHandler');

class CountryServiceClass {
  async getCountryDataByName(countryName) {
    try {
      const url = `${BASE_URL}/name/${encodeURIComponent(countryName)}`;
      const data = await getRequest(url);
      const essentialData = data.map(extractEssentialCountryInfo);
      return essentialData;
    } catch (error) {
      throw new CustomError(500, `Error in CountryService: ${error.message}`);
    }
  }
}

module.exports = CountryServiceClass;
