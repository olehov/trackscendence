import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { LanguageProvider } from './i18n/LanguageProvider'
import LanguageSwitcher from './components/LanguageSwitcher'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
        <LanguageSwitcher />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
