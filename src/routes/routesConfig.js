import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeView from "../Views/homeView";
import ServicesView from "../Views/services/servicesView"; // Asegúrate de crear este componente si aún no lo has hecho
import AboutUsView from "../Views/aboutUs/aboutUsView";
import ContactUs from "../Views/contact/contactUsView";
import BlogsView from "../Views/blog/blogView";
import ServiceDetailView from "../Views/services/serviceDetailView";
import TeamMemberDetailView from "../Views/aboutUs/memberTeamView";
import BlogDetailView from "../Views/blog/blogDetailView";
import LoginForm from "../Views/User/login";
import AdminPage from "../Views/User/adminPage";
import UserPage from "../Views/User/userPage";
import CreateBlog from "../Views/blog/createBlog";
import CreateUserForm from "../Views/User/createUser";
import CreateTeamMemberForm from "../Views/aboutUs/createMemberTeam";
import ComingSoon from "../Views/services/createService";

function RoutesConfig() {
    return (
        <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/servicios" element={<ServicesView />} />
            <Route path="/servicios/:id" element={<ServiceDetailView />} />
            <Route path="/create-service" element={<ComingSoon />} />
            <Route path="/aboutUs" element={<AboutUsView />} />
            <Route path="/aboutUs/:id" element={<TeamMemberDetailView />} />
            <Route path="/add-team-member" element={<CreateTeamMemberForm />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/blog" element={<BlogsView />} />
            <Route path="/blog/:blogId" element={<BlogDetailView />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/create-user" element={<CreateUserForm />} />
            {/* Agrega más rutas según sea necesario */}
        </Routes>
    );
}

export default RoutesConfig;