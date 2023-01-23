import _ from 'lodash';
window._ = _;

import axios from 'axios';
const apiClient = axios.create({
  baseURL: app.url,
  withCredentials: true
});

apiClient.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.axios = apiClient;
