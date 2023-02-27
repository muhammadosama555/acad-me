import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux"
import {store,persistor} from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import {positions,transitions,Provider as AlertProvider} from "react-alert"
import AlertTemplate from "react-alert-template-basic"

const options = {
   timeout:5000,
   position:positions.BOTTOM_CENTER,
   transition:transitions.SCALE
}


ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
      </AlertProvider>
      {/* </PersistGate> */}
   {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);


