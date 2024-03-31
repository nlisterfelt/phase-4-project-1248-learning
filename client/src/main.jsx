import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { CardProvider } from './context/CardContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <CardProvider>
        <App />
      </CardProvider>
    </UserProvider>
  </BrowserRouter>,
)
