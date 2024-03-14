import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Provider} from "react-redux"
import { store } from './store/store.js'
import { BrowserRouter } from 'react-router-dom'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
