import { createRoot } from 'react-dom/client'
import { ToastProvider } from "./components/toast/toast.tsx"
import './index.css'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <ToastProvider>
      <App />
  </ToastProvider>,
)
