const axios = require('axios');

async function getRequest(url, params = {}) {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data from external API: ${error.message}`);
  }
}

module.exports = { getRequest };
