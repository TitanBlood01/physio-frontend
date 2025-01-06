import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 20px;
  background-color: #f7f7f7;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
  }

  th {
    background-color: #f0f0f0;
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const BackButton = styled(Button)`
  background-color: #f44336;
  margin-bottom: 20px;

  &:hover {
    background-color: #e53935;
  }
`;

const API_URL = process.env.REACT_APP_API_URL;

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_URL}/services`);
        setServices(response.data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    };

    fetchServices();
  }, []);

  const handleModify = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <Container>
      <Title>Lista de Servicios</Title>
      <Table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
              <tr key={service._id}>
              <td>{service.tituloService}</td>
              <td>
                <Button onClick={() => handleModify(service._id)}>Modificar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
        <BackButton onClick={() => navigate(-1)}>Volver Atrás</BackButton>
    </Container>
  );
};

export default ServicesList;
