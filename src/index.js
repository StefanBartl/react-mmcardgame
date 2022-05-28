import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';


//#region Set language

// get setted language from local storage or browser language and store it there
const browserLanguagePattern = localStorage.language || navigator.language;

// RegEx to test for German language
const langRegExDE = /de/ig; 

// Test for german browser language against the getted browser language and finally set localStorage language
langRegExDE.test(browserLanguagePattern) 
  ? localStorage.setItem("Language", "de") 
  : localStorage.setItem("Language", "en");

//#endregion

const container = document.getElementById('root');
const root = createRoot(container); 

root.render(    
<React.StrictMode>
  <App />
</React.StrictMode>);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
