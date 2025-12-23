import "./App.css";
import { Layout } from "./components/layout/Layout.tsx";
import { Route, Routes } from "react-router-dom";
import { About } from "./pages/about/About.tsx";
import { ContactUs } from "./pages/contact/ContactUs.tsx";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<About />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/contact-us" element={<ContactUs />} />
            </Route>
        </Routes>
    );
}

export default App;
