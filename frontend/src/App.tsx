import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import MapLeaflet from "./components/MapLeaflet";
import CountryThreats from "./pages/CountryThreats"; 

const App = () => {
  return (
    <div data-theme="nord">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:id" element={<ProfilePage />}/>
            <Route path="/about" element={<AboutPage />}/>
            <Route path="/map" element={<MapLeaflet />} />
            <Route path="/threats/:country" element={<CountryThreats />} /> 

        </Routes>
    </div>
)}

export default App
