// Import necessary modules
import MainPage from './mainPage';
import React, { Suspense, useEffect } from "react";

//Routing Configurations
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
const Home = () => <h2>Home Page</h2>;
const OtherComponent = () => <h2>Other Component</h2>;

// App component
function App() {

  return (
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<MainPage />} />

          </Routes>
        </BrowserRouter>
  );
}


export default App;