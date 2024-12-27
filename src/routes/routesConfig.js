import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeView from "../Views/homeView";
import ServicesView from "../Views/servicesView"; // Asegúrate de crear este componente si aún no lo has hecho
import AboutUsView from "../Views/aboutUsView";
import ContactUs from "../Views/contactUsView";

function RoutesConfig() {
    return (
        <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/servicios" element={<ServicesView />} />
            <Route path="/aboutUs" element={<AboutUsView/>}/>
            <Route path="/contactUs" element={<ContactUs/>}/>
            {/* Agrega más rutas según sea necesario */}
        </Routes>
    );
}

export default RoutesConfig;