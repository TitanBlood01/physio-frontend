import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Estilos
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  width: 100%;
  max-width: 350px; /* Asegura que el formulario no se expanda más allá de este tamaño */
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box; /* Asegura que el padding no haga que el input se desborde */
`;

const Button = styled.button`
  background-color: #416434;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box; /* Asegura que el padding no haga que el botón se desborde */
  
  &:hover {
    background-color: #365b28;
  }
`;

const ToggleLink = styled.p`
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const LoginForm = () => {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [teamMember, setTeamMember] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    try {
      const endpoint = isSuperAdmin
        ? "https://physio-backend-1l1v.onrender.com/api/auth/superadmin/signin"
        : "https://physio-backend-1l1v.onrender.com/api/auth/signin";

      const payload = isSuperAdmin
        ? { secretKey, password }
        : { teamMember, password };

      const response = await axios.post(endpoint, payload);

      const { token, userId, role } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      if (role === "superAdmin" || role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/user");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <Container>
      <Title>{isSuperAdmin ? "SuperAdmin Login" : "Iniciar Sesión"}</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        {isSuperAdmin ? (
          <>
            <FormGroup>
              <Label>Clave Secreta</Label>
              <Input
                type="text"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                required
              />
            </FormGroup>
          </>
        ) : (
          <FormGroup>
            <Label>CI del Miembro del Equipo</Label>
            <Input
              type="text"
              value={teamMember}
              onChange={(e) => setTeamMember(e.target.value)}
              required
            />
          </FormGroup>
        )}
        <FormGroup>
          <Label>Contraseña</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">Iniciar sesión</Button>
      </Form>
      <ToggleLink onClick={() => setIsSuperAdmin(!isSuperAdmin)}>
        {isSuperAdmin
          ? "¿No eres SuperAdmin? Iniciar sesión normal"
          : "¿Eres SuperAdmin? Iniciar aquí"}
      </ToggleLink>
    </Container>
  );
};

export default LoginForm;


