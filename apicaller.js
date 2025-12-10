// apicaller.js
const axios = require('axios');

// const BASE_URL = 'http://202.83.25.185:4065/'; // your API base
// const BASE_URL = 'http://49.207.186.126:8001/'; 
const BASE_URL = 'https://renewalapi.jipolicy.com/';

module.exports = {
  async apicallerLivePort(apiName, dictionary) {
    try {
      const response = await axios.post(`${BASE_URL}api/${apiName}`, dictionary, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      console.error('POST API error:', error.message);
      return null;
    }
  },

  async apicallerLivePort_formdata(apiName, formData, options = {}) {
    try {
      const response = await axios.post(
        `${BASE_URL}api/${apiName}`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),   // required for multipart
            ...options.headers           // merge extras
          }
        }
      );

      return response;  // MUST return full response
    } catch (error) {
      console.error("POST API error:", error.message);
      return null;
    }
  },

  async apicallerGet(apiName) {
    try {
      const response = await axios.get(`${BASE_URL}api/${apiName}`);
      return response.data;
    } catch (error) {
      console.error('GET API error:', error.message);
      return null;
    }
  }
};
