import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Memastikan Tailwind atau CSS global dimuat

/**
 * Mengambil elemen <div id="root"> dari index.html
 */
const rootElement = document.getElementById('root');

/**
 * Membuat root React di elemen tersebut
 */
const root = ReactDOM.createRoot(rootElement);

/**
 * Merender aplikasi ke dalam root
 * StrictMode membantu mendeteksi potensi masalah pada aplikasi selama pengembangan
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);