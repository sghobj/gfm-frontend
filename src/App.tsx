import "./App.css";
import { Layout } from "./components/layout/Layout.tsx";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home.tsx";
import { About } from "./pages/about/About.tsx";
import { ContactUs } from "./pages/contact/ContactUs.tsx";
import { ProductDetails } from "./pages/products/ProductDetails.tsx";
import { Products } from "./pages/products/Products.tsx";
import { CertificatesPage } from "./pages/certificates/CertificatesPage.tsx";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage.tsx";
import { AdminOrderLinksPage } from "./pages/admin/AdminOrderLinksPage.tsx";
import { OrderSubmitPage } from "./pages/order/OrderSubmitPage.tsx";
import { RequireAdminAuth } from "./auth/RequireAdminAuth.tsx";

function App() {
    return (
        <Routes>
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route element={<RequireAdminAuth />}>
                <Route path="/admin/order-links" element={<AdminOrderLinksPage />} />
            </Route>

            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                 <Route path="/certificates" element={<CertificatesPage />} />
                <Route path="/order/submit" element={<OrderSubmitPage />} />
            </Route>
        </Routes>
    );
}

export default App;
