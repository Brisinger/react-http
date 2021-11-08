import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "./axiosinstance";

/* axios.defaults.baseURL = 'https://react-myapp-8774a-default-rtdb.asia-southeast1.firebasedatabase.app';

axios.defaults.headers.common['Authorization'] = 'Auth Token'; */

axios.interceptors.request.use(request => {
  request.headers['Channel-Name'] = 'Shubho Web Dev';
  console.log(request);
  return request;
});

axios.interceptors.response.use(response => {
  console.log(response.data);
  return response;
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
