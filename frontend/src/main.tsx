import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ClickSpark from "@/components/anim/Animations/ClickSpark/ClickSpark.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ClickSpark
          sparkColor='#FFF'
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
      >
        <App />
      </ClickSpark>
  </StrictMode>,
)
