import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App mode="list" />
    </React.StrictMode>
  );
}

// Overview mode - render in all elements with dante-groups-overview class
const overviewElements = document.getElementsByClassName('dante-groups-overview');
Array.from(overviewElements).forEach(element => {
  const root = ReactDOM.createRoot(element);
  root.render(
    <React.StrictMode>
      <App mode="overview" />
    </React.StrictMode>
  );
});