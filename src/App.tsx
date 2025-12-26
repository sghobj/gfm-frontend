import "./App.css";
import { Layout } from "./components/layout/Layout.tsx";
import { Route, Routes } from "react-router-dom";
import { About } from "./pages/about/About.tsx";
import { ContactUs } from "./pages/contact/ContactUs.tsx";
import {Products} from "./pages/products/Products.tsx";
import {ProductDetails} from "./pages/products/ProductDetails.tsx";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<About />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Route>
        </Routes>
    );
}

export default App;
