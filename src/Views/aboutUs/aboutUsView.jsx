// aboutUsview.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { aboutUsTexts } from "../../utilities/texts";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AboutUsView = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get("https://physio-backend-1l1v.onrender.com/api/team"); // Asegúrate de que el endpoint esté configurado correctamente
        setTeamMembers(response.data);
      } catch (error) {
        console.error("Error al obtener los miembros del equipo:", error);
      }
    };

    fetchTeam();
  }, []);
  return (
    <MainContainer>
      <Title>{aboutUsTexts.title}</Title>
      <VisionMissionContainer>
        <SectionTitle>MISIÓN</SectionTitle>
        <Paragraph>{aboutUsTexts.mission}</Paragraph>
        <SectionTitle>VISIÓN</SectionTitle>
        <Paragraph>{aboutUsTexts.vision}</Paragraph>
        <SectionTitle>Valores</SectionTitle>
        <ValuesList>
          {aboutUsTexts.values.map((value, index) => (
            <ListItem key={index}>{value}</ListItem>
          ))}
        </ValuesList>
      </VisionMissionContainer>
      <TeamSection>
        <TeamTitle>{aboutUsTexts.teamTitle}</TeamTitle>
        <ProfilesContainer>
          {teamMembers.map((member) => (
            <Profile key={member._id}>
            <ProfileImage src={member.fotoPerfil} alt={member.nombre} />
            <ProfileText>
              {member.abreviacionCargo} {member.nombre} {member.apellido}
            </ProfileText>
            <ProfileButtonContainer>
              <ViewMoreButton onClick={() => navigate(`/aboutUs/${member._id}`)}>Ver más</ViewMoreButton>
            </ProfileButtonContainer>
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

const ProfileButtonContainer = styled.div`
  margin-top: auto; /* Empuja el botón hacia abajo */
`;

const ViewMoreButton = styled.button`
  background-color: #4CAF50; /* Verde */
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
