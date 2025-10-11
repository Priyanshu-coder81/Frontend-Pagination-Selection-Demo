import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/themes/lara-light-cyan/theme.css";

import NavBar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  

  return (
    <PrimeReactProvider>
        <div className=' min-h-screen bg-white'>
      <NavBar />
      <Hero />
      </div>
    </PrimeReactProvider>
  );
}

export default App;
