
//index.tsx
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import rootReducer from './redux/config/index';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({reducer:rootReducer});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
