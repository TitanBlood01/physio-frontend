import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";


// Estilo para el contenedor principal
const Container = styled.div`
  padding: 20px;
  text-align: center;
  margin-top: 60px;
`;

// Estilo para el texto que resalta la invitación para reservar cita
const HighlightText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #253f5a; /* Puedes cambiar el color aquí */
  margin-top: 60px;
  margin-bottom: 20px;
  background-color: #f1f8ff; /* Fondo suave para resaltar */
  padding: 10px;
  border-radius: 4px;
`;

// Estilo para el botón de contacto
const ContactButton = styled.button`
  background-color: #4caf50; /* Color de fondo verde */
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049; /* Color de fondo cuando el botón es hover */
  }
`;

// Estilo para el botón de "Volver a Servicios"
const BackButton = styled.button`
  background-color: #2196f3; /* Color de fondo azul */
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0b7dda; /* Color de fondo cuando el botón es hover */
  }
`;

const API_URL = process.env.REACT_APP_API_URL; 

function ServiceDetailView() {
  const { id } = useParams(); // Obtiene el id del servicio desde la URL
  const [service, setService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const response = await axios.get(`${API_URL}/services/${id}`);
        setService(response.data);
      } catch (error) {
        console.error("Error al obtener el servicio:", error);
      }
    };

    fetchServiceDetail();
  }, [id]);

  if (!service) {
    return <p>Cargando...</p>;
  }

  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "row", padding: "20px" }}>
        <div style={{ flex: 1 }}>
          <img src={service.imageService} alt={service.tituloService} style={{ width: "100%", height: "300px", objectFit: "cover" }} />
        </div>
        <div style={{ flex: 1, marginLeft: "20px" }}>
          <h2>{service.tituloService}</h2>
          <p>{service.descriptionService}</p>
        </div>
      </div>
      {/* Texto invitando a reservar una cita */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <HighlightText>¿Estás interesado en reservar una cita para este servicio?</HighlightText>
        <Link to="/contactUs">
          <ContactButton>Contáctanos</ContactButton>
        </Link>
      </div>
      {/* Botón para ir hacia atrás a la vista de servicios */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <BackButton onClick={() => navigate("/servicios")}>Volver a Servicios</BackButton>
      </div>
    </Container>
  );
}

export default ServiceDetailView;
