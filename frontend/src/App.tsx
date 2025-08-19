import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { ThemeProvider } from '@/components/theme/theme-provider';
import ClickSpark from "@/components/anim/Animations/ClickSpark/ClickSpark.tsx";


export default function App() {
  return (
    <ThemeProvider>
        <ClickSpark
            sparkColor='#FFF'
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
        >
            <div className="w-screen min-h-screen flex flex-col m-0 p-0">
              <Header />
              <Main />
              <Footer />
            </div>
        </ClickSpark>
    </ThemeProvider>
  );
}


