import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import './styles/styles.css';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
// console.log('CLIENT_ID', CLIENT_ID);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Provider store={store}>
        <App />
        <Toaster position="top-center" reverseOrder={false} /> 
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
