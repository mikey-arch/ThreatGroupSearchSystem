import {Route, Routes} from "react-router";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";

const App = () => {
  return (
    <div data-theme="nord">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:id" element={<ProfilePage />}/>
            <Route path="/about" element={<AboutPage />}/>
        </Routes>
    </div>
)}

export default App
