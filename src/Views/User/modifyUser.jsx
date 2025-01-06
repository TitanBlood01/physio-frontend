import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
  height: 100vh;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:disabled {
    background-color: #f5f5f5;
  }
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const BackButton = styled.button`
  background-color: #f44336;
  color: white;
  font-size: 1rem;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;

  &:hover {
    background-color: #e53935;
  }
`;

const API_URL = process.env.REACT_APP_API_URL;

const ModifyUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Obtener los datos del usuario por ID
    axios
      .get(`${API_URL}/user/${id}`, {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      password,
    };

    axios
      .put(`${API_URL}/user/${id}`, updatedData, {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        alert("Contraseña actualizada exitosamente");
        navigate("/admin"); // Regresar a la lista de usuarios
      })
      .catch((error) => {
        console.log(error);
        alert("Error al actualizar la contraseña");
      });
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <Container>
      <Title>Modificar Usuario</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nombre:</Label>
          <Input
            type="text"
            value={`${user.teamMember.nombre} ${user.teamMember.apellido}`}
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label>Posición:</Label>
          <Input
            type="text"
            value={user.teamMember.posicion}
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label>Rol:</Label>
          <Input
            type="text"
            value={user.roles.map((role) => role.name).join(", ")}
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label>CI (Carnet de Identidad):</Label>
          <Input
            type="text"
            value={user.teamMember.carnetIdentidad || "No disponible"}
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label>Contraseña:</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nueva contraseña"
          />
        </FormGroup>
        <SubmitButton type="submit">Actualizar Contraseña</SubmitButton>
      </Form>

      {/* Botón para regresar a la lista de usuarios */}
      <BackButton onClick={() => navigate(-1)}>Volver</BackButton>
    </Container>
  );
};

export default ModifyUser;
