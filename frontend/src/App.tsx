import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from '@/components/theme/theme-provider';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow"></main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
