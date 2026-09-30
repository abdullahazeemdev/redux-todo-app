import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PersistGate } from "redux-persist/integration/react";
import './index.css'
import App from './App.jsx'
import store , {persistor} from './app/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>

    </Provider>

  </StrictMode>,
)
