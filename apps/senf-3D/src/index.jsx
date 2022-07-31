import React from 'react';
import ReactDOM from 'react-dom/client';
import * as THREE from "three"
import App from './App';

window.THREE = THREE;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);