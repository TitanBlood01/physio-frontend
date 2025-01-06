import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// Estilos
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Arial', sans-serif;
  padding: 20px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
`;

const UserList = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 30px;
`;

const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Button = styled.button`
  background-color: #416434;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  cursor: pointer;

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

const API_URL = process.env.REACT_APP_API_URL;

const UsersList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "admin" && role !== "superAdmin") {
      navigate("/login");
    }

    const token = localStorage.getItem("token"); // Obtener el token desde localStorage
    
    // Obtener usuarios desde el servidor con el encabezado de autorización
    axios.get(`${API_URL}/user`, {
      headers: {
        "x-access-token": token, // Incluir el token en los encabezados
      }
    })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error al obtener usuarios", error);
      });
  }, [navigate, role]);

  return (
    <Container>
      <Title>Modificar Usuarios</Title>
      <UserList>
        {users.map((user) => (
          <UserItem key={user._id}>
            <div>
              <strong>{user.teamMember?.nombre} {user.teamMember?.apellido}</strong>
              <p>{user.roles.map(role => role.nombre).join(", ")}</p>
            </div>
            <Button onClick={() => navigate(`/edit-user/${user._id}`)}>Modificar</Button>
          </UserItem>
        ))}
      </UserList>
      <GoBackButton onClick={() => navigate(-1)}>Volver atrás</GoBackButton>
    </Container>
  );
};

export default UsersList;
