import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom"; // Para redirigir al detalle del servicio

// Contenedor principal
const ServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

// Título
const Title = styled.h2`
  margin-bottom: 20px;
`;

// Contenedor de los servicios
const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 80%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Contenedor individual de cada servicio
const ServiceCard = styled.div`
  background-color: #f0f0f0; /* Color de fondo del servicio */
  border-radius: 8px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

// Imagen del servicio
const ServiceImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: 0% 15%;
  border-radius: 4px;
`;

// Descripción del servicio
const ServiceDescription = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
`;

// Botón "Ver más"
const SeeMoreButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

function ServicesView() {
  const [services, setServices] = useState([]);

  // Obtener servicios desde el servidor
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/services");
        setServices(response.data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <ServicesContainer>
      <Title>Servicios Ofrecidos</Title>
      <ServicesGrid>
        {services.map((service) => (
          <ServiceCard key={service._id}>
            <ServiceImage src={service.imageService} alt={service.tituloService} />
            <h3>{service.tituloService}</h3>
            <ServiceDescription>{service.descriptionService}</ServiceDescription>
            <Link to={`/servicios/${service._id}`}>
              <SeeMoreButton>Ver más</SeeMoreButton>
            </Link>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesContainer>
  );
}

export default ServicesView;
