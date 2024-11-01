import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './scenes/global/Topbar.css'
import { BrowserRouter } from "react-router-dom";
// import { createRoot } from 'react-dom/client';

import { store } from './store';
import { Provider } from 'react-redux';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>

        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
