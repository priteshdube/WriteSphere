import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BlogProvider } from './context/index.tsx'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <BlogProvider>
       <App />
    </BlogProvider>
  </StrictMode>,
)
