// contactUs.js
import React from 'react';
import styled from 'styled-components';
// Importa íconos según tu preferencia de biblioteca, aquí un ejemplo con react-icons
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
// Importa componentes de Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

const ContactUs = () => {
  const latitud = -16.540644; // Reemplaza con la latitud de tu entidad
  const longitud = -68.079335; // Reemplaza con la longitud de tu entidad

  return (
    <MainContainer>
      <Title>¿Dónde nos ubica?</Title>

      <MapContainerStyled
        center={[latitud, longitud]}
        zoom={18}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitud, longitud]}>
          <Popup>Physio Active</Popup>
        </Marker>
      </MapContainerStyled>

      <LocationText>Nos ubicamos en la Avenida Montenegro<br/>Edificio Spica, piso 5B</LocationText>

      <ContactInfo>
        <InfoRow>
          <Icon><FaPhoneAlt /></Icon>
          <TextHighlight>Número de Teléfono:</TextHighlight>
          <PhoneNumber>720-97577</PhoneNumber>
        </InfoRow>
        <InfoRow>
          <PhoneNumber>(+591) 68009250</PhoneNumber>
        </InfoRow>
        <WhatsAppButton href="https://wa.link/se3clc" target="_blank">
          Escríbenos
        </WhatsAppButton>
      </ContactInfo>

      <ContactInfo>
        <InfoRow>
          <Icon><FaEnvelope /></Icon>
          <TextHighlight>Correo Electrónico:</TextHighlight>
          <Email>physioactivefisioterapia@gmail.com</Email>
        </InfoRow>
        {/* Comentado el formulario por ahora */}
        {/* 
        <Form>
          <Input type="text" placeholder="Nombre Completo" required />
          <Input type="email" placeholder="Email" required />
          <Input type="tel" placeholder="Celular" required />
          <Textarea placeholder="Mensaje" required></Textarea>
          <SendButton>Mandar Email</SendButton>
        </Form> 
        */}

        {/* Nuevo texto en lugar del formulario */}
        <MessageText>
          En Physio Active, nos comprometemos a brindarte la mejor atención y cuidarte con el más alto estándar de calidad. Si tienes alguna duda, pregunta o si deseas más información sobre nuestros servicios, no dudes en contactarnos. Estaremos encantados de atenderte y ayudarte con todo lo que necesites. Puedes comunicarte con nosotros a través de los números telefónicos o por correo electrónico, o incluso enviar un mensaje directo a través de WhatsApp. Nos aseguraremos de responderte lo más pronto posible y ofrecerte la asistencia que mereces.
        </MessageText>
      </ContactInfo>
    </MainContainer>
  );
};

export default ContactUs;

// Estilos
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({theme}) => theme.colors.backgroundColor};
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const MapContainerStyled = styled(MapContainer)`
  width: 80%;
  height: 800px;
  margin-bottom: 20px;
  z-index:0;
`;

const LocationText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  align-items: center;
`;

const ContactInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Icon = styled.span`
  color: #253f5a; /* Azul */
  margin-right: 10px;
`;

const TextHighlight = styled.span`
  color: #253f5a; /* Azul */
  font-weight: bold;
  margin-right: 10px;
`;

const PhoneNumber = styled.p`
  font-size: 1rem;
`;

const WhatsAppButton = styled.a`
  display: inline-block;
  background-color: #4CAF50; /* Verde */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  margin-top: 10px;
`;

const Email = styled.p`
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
`;

const SendButton = styled.button`
  background-color: #4CAF50; /* Verde */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

const MessageText = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;
  line-height: 1.6;
  color: #555;
  max-width: 800px;
  padding: 0 20px;
`;