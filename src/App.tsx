import "./App.css";
import { Layout } from "./components/layout/Layout.tsx";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home.tsx";
import { About } from "./pages/about/About.tsx";
import { ContactUs } from "./pages/contact/ContactUs.tsx";
import { ProductDetails } from "./pages/products/ProductDetails.tsx";
import { OrderPage } from "./pages/order/OrderPage.tsx";
import { Products } from "./pages/products/Products.tsx";
import { CertificatesPage } from "./pages/certificates/CertificatesPage.tsx";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/order/:id" element={<OrderPage />} />
                <Route path="/certificates" element={<CertificatesPage />} />
            </Route>
        </Routes>
    );
}

export default App;
