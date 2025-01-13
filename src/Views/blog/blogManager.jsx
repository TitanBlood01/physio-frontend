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
  gap: 20px;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 0 20px;
`;

const Button = styled.button`
  background-color: #416434;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px 30px;
  cursor: pointer;
  font-size: 1.2rem;
  width: 100%; 

  &:hover {
    background-color: #365b28;
  }
`;

const GoBackButton = styled(Button)`
  background-color: #c14e3f; 
  
  &:hover {
    background-color: #a03c2f;
  }
`;

const BlogManager = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  if (role !== "admin" && role !== "superAdmin") {
    navigate("/login");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/blog");
  };

  return (
    <Container>
      <Title>Gestión de Blogs</Title>
      <WelcomeMessage>Bienvenido a la gestión de blogs</WelcomeMessage>
      <ButtonContainer>
        <Button onClick={() => navigate("/create-blog")}>Crear Nuevo Blog</Button>
        <Button onClick={() => navigate("/all-blogs")}>Modificar Blog</Button>
        <Button onClick={handleLogout}>Cerrar sesión</Button>
        <GoBackButton onClick={() => navigate("/admin")}>Volver atrás</GoBackButton>
      </ButtonContainer>
    </Container>
  );
};

export default BlogManager;
