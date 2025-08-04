import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { ThemeProvider } from '@/components/theme/theme-provider';

export default function App() {
  return (
    <ThemeProvider>
      <div className="w-screen min-h-screen flex flex-col m-0 p-0">
        <Header />
        <Main />
        <Footer />
      </div>
    </ThemeProvider>
  );
}


