import React from "react";
import {styled} from "styled-components";

// Contenedor principal
const ServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: ${({theme}) => theme.colors.backgroundColor};
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

  &:hover .tooltip {
    display: block; /* Muestra la descripción flotante al pasar el cursor */
  }
`;

// Tooltip (contenedor flotante)
const Tooltip = styled.div`
  display: none;
  position: absolute;
  bottom: 100%; /* Coloca el tooltip encima */
  left: 50%;
  transform: translateX(-50%);
  background-color: #253f5a; /* Color de fondo del tooltip */
  color: white;
  padding: 10px;
  border-radius: 4px;
  white-space: nowrap;
`;

// Imagen del servicio
const ServiceImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

function ServicesView() {
  return (
    <ServicesContainer>
      <Title>Servicios Ofrecidos</Title>
      <ServicesGrid>
        {/* Primer servicio */}
        <ServiceCard>
          <ServiceImage src="https://via.placeholder.com/300" alt="Servicio 1" />
          <h3>Servicio 1</h3>
          <Tooltip className="tooltip">Descripción breve del Servicio 1. <button>Ver más</button></Tooltip>
        </ServiceCard>

        {/* Segundo servicio */}
        <ServiceCard>
          <ServiceImage src="https://via.placeholder.com/300" alt="Servicio 2" />
          <h3>Servicio 2</h3>
          <Tooltip className="tooltip">Descripción breve del Servicio 2. <button>Ver más</button></Tooltip>
        </ServiceCard>

        {/* Tercer servicio */}
        <ServiceCard>
          <ServiceImage src="https://via.placeholder.com/300" alt="Servicio 3" />
          <h3>Servicio 3</h3>
          <Tooltip className="tooltip">Descripción breve del Servicio 3. <button>Ver más</button></Tooltip>
        </ServiceCard>

        {/* Cuarto servicio */}
        <ServiceCard>
          <ServiceImage src="https://via.placeholder.com/300" alt="Servicio 4" />
          <h3>Servicio 4</h3>
          <Tooltip className="tooltip">Descripción breve del Servicio 4. <button>Ver más</button></Tooltip>
        </ServiceCard>
      </ServicesGrid>
    </ServicesContainer>
  );
}

export default ServicesView;
