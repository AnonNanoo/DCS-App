import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from '@/components/theme/theme-provider';

export default function App() {
  return (
    <ThemeProvider>
      <div className="w-screen min-h-screen flex flex-col m-0 p-0">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center">Welcome to DCS</h1>
            <p className="text-center mt-4 text-muted-foreground">Your Devices will show here.</p>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}


