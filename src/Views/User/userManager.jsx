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
  flex-direction: column;
  gap: 20px; /* Mayor separación entre botones */
  align-items: center;
  width: 100%;
  max-width: 400px; /* Limitar el tamaño máximo de los botones */
  padding: 0 20px; /* Espaciado de los botones en pantallas pequeñas */
`;

const Button = styled.button`
  background-color: #416434;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px 30px; /* Más espacio en los botones */
  cursor: pointer;
  font-size: 1.2rem;
  width: 100%; /* Los botones ocuparán todo el ancho disponible en pantallas pequeñas */

  &:hover {
    background-color: #365b28;
  }
`;

const GoBackButton = styled(Button)`
  background-color: #c14e3f; /* Diferente color para el botón de volver */
  
  &:hover {
    background-color: #a03c2f;
  }
`;

const UserManager = () => {
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
      <Title>Gestión de Usuarios</Title>
      <WelcomeMessage>Bienvenido a la gestión de usuarios</WelcomeMessage>
      <ButtonContainer>
        <Button onClick={() => navigate("/create-user")}>Crear Nuevo Usuario</Button>
        <Button onClick={() => navigate("/modify-user")}>Modificar Usuario</Button>
        <Button onClick={handleLogout}>Cerrar sesión</Button> {/* Botón de Cerrar sesión */}
        <GoBackButton onClick={() => navigate(-1)}>Volver atrás</GoBackButton> {/* Botón de Volver atrás */}
      </ButtonContainer>
    </Container>
  );
};

export default UserManager;

