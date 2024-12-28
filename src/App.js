import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Homeview from './Views/homeView';
import Footer from './components/footer';
import RoutesConfig from './routes/routesConfig';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <RoutesConfig />
        <Footer />
      </Router>
      <ToastContainer /> {/* ToastContainer aquí */}
    </ThemeProvider>
  );
}

export default App;
