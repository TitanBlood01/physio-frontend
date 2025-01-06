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
import UserManager from "../Views/User/userManager";
import ServiceManagementPage from "../Views/services/servicesManager";
import TeamManagementPage from "../Views/aboutUs/teamManager";
import BlogManager from "../Views/blog/blogManager";
import UsersList from "../Views/User/UserList";
import ModifyUser from "../Views/User/modifyUser";
import BlogsList from "../Views/blog/blogsList";
import BlogModify from "../Views/blog/blogModify";
import ServiceCreate from "../Views/services/createService";
import ServicesList from "../Views/services/serviceList";
import EditService from "../Views/services/serviceModify";
import TeamList from "../Views/aboutUs/teamList";
import EditTeamMemberForm from "../Views/aboutUs/memberTeamUpdate";
import EditTeamMember from "../Views/aboutUs/memberTeamUpdate";

function RoutesConfig() {
    return (
        <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/servicios" element={<ServicesView />} />
            <Route path="/servicios/:id" element={<ServiceDetailView />} />
            <Route path="/service-management" element={<ServiceManagementPage />} />
            <Route path="/create-service" element={<ServiceCreate />} />
            <Route path="/all-services" element={<ServicesList />} />
            <Route path="/services/:serviceId" element={<EditService />} />
            <Route path="/aboutUs" element={<AboutUsView />} />
            <Route path="/aboutUs/:id" element={<TeamMemberDetailView />} />
            <Route path="/team-management" element={<TeamManagementPage />} />
            <Route path="/add-team-member" element={<CreateTeamMemberForm />} />
            <Route path="/all-team-members" element={<TeamList />} />
            <Route path="/team/edit/:id" element={<EditTeamMember />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/blog" element={<BlogsView />} />
            <Route path="/blog/:blogId" element={<BlogDetailView />} />
            <Route path="/blog-management" element={<BlogManager />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/all-blogs" element={<BlogsList />} />
            <Route path="/blogs/:id" element={<BlogModify />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/user-management" element={<UserManager />} />
            <Route path="/create-user" element={<CreateUserForm />} />
            <Route path="/modify-user" element={<UsersList />} />
            <Route path="/edit-user/:id" element={<ModifyUser />} />
            {/* Agrega más rutas según sea necesario */}
        </Routes>
    );
}

export default RoutesConfig;