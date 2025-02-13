// src/config/api.js or similar
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://codefix-3.onrender.com'  
  : 'http://localhost:3000';

export default API_URL;
