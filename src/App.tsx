import "./App.css";
import { Layout } from "./components/layout/Layout.tsx";
import { Route, Routes } from "react-router-dom";
import { About } from "./pages/about/About.tsx";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<About />} />
                <Route path="/about-us" element={<About />} />
            </Route>
        </Routes>
    );
}

export default App;
