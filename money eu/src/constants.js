const API_URL_BASE='http://localhost:8080/';
const API_URL='api/';

// const API_URL_FILES='https://dev.lb.crm.moneyeu.dev/api';for dev--'https://dev.crm.moneyeu.dev'
// const API_URL_FILES='https://lb.zestpayments.com/api';// for production---https://crm.zestpayments.co
const API_URL_FILES=API_URL_BASE + 'api'; // for localhost
const server_url=API_URL_BASE+API_URL;

export { API_URL_FILES, server_url };