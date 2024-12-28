import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Estilos
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Arial', sans-serif;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
`;

const WelcomeMessage = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  background-color: #416434;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  width: 200px;

  &:hover {
    background-color: #365b28;
  }
`;

const AdminPage = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  if (role !== "admin" && role !== "superAdmin") {
    navigate("/login"); // Redirigir si no es admin ni superadmin
  }

  const handleLogout = () => {
    // Eliminar el token y el nombre del usuario
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/blog"); // Redirigir a la vista de blogs después de cerrar sesión
  };

  return (
    <Container>
      <Title>Página de Administración</Title>
      <WelcomeMessage>Bienvenido Adolfo</WelcomeMessage>
      <ButtonContainer>
        <Button onClick={() => navigate("/create-user")}>Crear Nuevo Usuario</Button>
        <Button onClick={() => navigate("/create-blog")}>Escribir Blog</Button>
        <Button onClick={() => navigate("/create-service")}>Crear Servicio</Button>
        <Button onClick={() => navigate("/add-team-member")}>Añadir Miembro al Equipo</Button>
        <Button onClick={handleLogout}>Cerrar sesión</Button> {/* Botón de Cerrar sesión */}
      </ButtonContainer>
    </Container>
  );
};

export default AdminPage;
