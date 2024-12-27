// aboutUsview.js
import React from 'react';
import styled from 'styled-components';
import { profileImages } from '../assets/images'; // Importa tus imágenes desde images.js

const AboutUsView = () => {
  return (
    <MainContainer>
      <Title>¿Quiénes somos?</Title>
      <VisionMissionContainer>
        <SectionTitle>MISIÓN</SectionTitle>
        <Paragraph>Contribuir a la salud y bienestar de las personas poniendo a su disposición servicios de  máxima calidad asi
          tambien de una forma cercana y accesible, concientizando a la población de los beneficios de la fisioterapia deportiva y
          kinesiologia Integral . Garantizando  el cuidado osteo-mio-articular en la vida diaria de manera que se establezcan valores
          a través de Physio Active  para la sociedad.</Paragraph>
        <SectionTitle>VISIÓN</SectionTitle>
        <Paragraph>Ser una  empresa dedicada  a la salud reconocida como líder en el tratamiento musculoesquelético, rehabilitación 
          deportiva y bienestar por parte de sus pacientes, empleados,  proveedores y todos los grupos de interés relacionados con 
          la actividad de la salud.</Paragraph>
        <SectionTitle>Valores</SectionTitle>
        <ValuesList>
          <ListItem>Enfoque en el desarrollo del bienestar a largo plazo sin perder
             enfasis ante la necesidad de obtener continuamente resultados que nos permitan un crecimiento sólido.</ListItem>
          <ListItem>Compromiso con prácticas y pasantias con Universidades  sostenibles que protejan a las generaciones futuras.</ListItem>
          <ListItem>Marcar la diferencia en todo lo que hacemos gracias a la entereza por mejorar y por prestar un  servicio individual 
            de calidad con disciplina, rapidez y una ejecución de un  protocolo correcto</ListItem>
          <ListItem>Facilitar el aporte de ideas, escuchando opiniones distintas  expresadas de forma abierta y sincera.</ListItem>
          <ListItem>Compromiso con los pacientes con una sólida atencion basados en ética laboral, integridad, concentracion y cuidado, 
            así como con el cumplimiento de la legislación aplicable a los principios, protocolos y estándares de salud</ListItem>
        </ValuesList>
      </VisionMissionContainer>
      <TeamSection>
        <TeamTitle>Conozca al equipo</TeamTitle>
        <ProfilesContainer>
          {profileImages.map((image, index) => (
            <Profile key={index}>
              <ProfileImage src={image.src} alt={`Perfil ${index + 1}`} />
              <ProfileText>Nombre del equipo</ProfileText>
              <ViewMoreButton>Ver más</ViewMoreButton>
            </Profile>
          ))}
        </ProfilesContainer>
      </TeamSection>
    </MainContainer>
  );
};

export default AboutUsView;

// Estilos
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const VisionMissionContainer = styled.div`
  background-color: #253f5a; /* Azul oscuro */
  color: white;
  padding: 20px;
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin: 20px 0 10px 0;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  margin: 20px 0 10px 0;
`;

const ValuesList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin: 20px 0 10px 0;
`;

const ListItem = styled.li`
  font-size: 1rem;
  margin: 8px 0;
`;

const TeamSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TeamTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

const ProfilesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const ProfileText = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const ViewMoreButton = styled.button`
  background-color: #4CAF50; /* Verde */
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
