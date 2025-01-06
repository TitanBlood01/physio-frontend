import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";


// Estilo para el contenedor principal
const Container = styled.div`
  padding: 20px;
  text-align: center;
  margin-top: 60px;

  @media (max-width: 768px) {
    padding: 16px; /* Espaciado interno para dispositivos móviles */
  }
`;

// Contenedor para la disposición del contenido
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row; /* Diseño en fila por defecto */
  padding: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column; /* Cambia a columnas en pantallas pequeñas */
    align-items: center; /* Centra los elementos en pantallas pequeñas */
  }
`;

// Contenedor para centrar la imagen y mantener un tamaño uniforme
const ImageContainer = styled.div`
  width: 50%; /* Ocupa el ancho del contenedor principal */
  height: 450px; /* Altura uniforme para todas las imágenes */
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Alinea hacia arriba */
  overflow: hidden; /* Oculta partes de la imagen que sobresalgan */
  margin-bottom: 20px;
  border-radius: 8px; /* Opcional: bordes redondeados */

  @media (max-width: 768px) {
    width: 100%; /* Imagen ocupa todo el ancho en dispositivos móviles */
    height: 300px; /* Ajusta la altura en dispositivos pequeños */
    margin: 0 auto 20px; /* Centra la imagen y agrega margen inferior */
  }
`;

// Estilo para la imagen
const StyledImage = styled.img`
  width: 100%; /* Asegura que la imagen ocupe todo el ancho */
  height: 100%; /* Asegura que la imagen ocupe todo el alto */
  object-fit: cover; /* Recorta las imágenes para llenar el contenedor */
  object-position: top; /* Muestra la parte superior para imágenes verticales */
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

// Contenedor para el texto
const TextContainer = styled.div`
  flex: 1;
  margin-left: 20px;

  @media (max-width: 768px) {
    margin-left: 0; /* Elimina margen lateral en dispositivos móviles */
    text-align: center; /* Centra el texto en pantallas pequeñas */
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
      <ContentWrapper>
        <ImageContainer>
          <StyledImage
            src={service.imageService}
            alt={service.tituloService}
          />
        </ImageContainer>
        <TextContainer>
          <h2>{service.tituloService}</h2>
          <p>{service.descriptionService}</p>
        </TextContainer>
      </ContentWrapper>
      {/* Texto invitando a reservar una cita */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <HighlightText>
          ¿Estás interesado en reservar una cita para este servicio?
        </HighlightText>
        <Link to="/contactUs">
          <ContactButton>Contáctanos</ContactButton>
        </Link>
      </div>
      {/* Botón para ir hacia atrás a la vista de servicios */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <BackButton onClick={() => navigate("/servicios")}>
          Volver a Servicios
        </BackButton>
      </div>
    </Container>
  );
}

export default ServiceDetailView;
