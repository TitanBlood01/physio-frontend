import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Estilos
const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: #f9f9f9;
  gap: 20px;
  margin-top: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 650px;
  object-fit: cover;
  border-radius: 10px;
  object-position: top;
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Name = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const Position = styled.h3`
  font-size: 1.5rem;
  color: #555;
`;

const Matricula = styled.p`
  font-size: 1rem;
  margin: 10px 0;
`;

const Experiencia = styled.div`
  margin-top: 20px;

  ul {
    list-style-type: disc;
    margin-left: 20px;
  }
`;

const BackButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 20px;
`;

const API_URL = process.env.REACT_APP_API_URL; 

const TeamMemberDetailView = () => {
    const { id } = useParams(); // Obtiene el ID del miembro desde la URL
    const [member, setMember] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMemberDetail = async () => {
            try {
                const response = await axios.get(`${API_URL}/team/${id}`);
                setMember(response.data.memberTeam);
            } catch (error) {
                console.error("Error al obtener el miembro del equipo:", error);
            }
        };

        fetchMemberDetail();
    }, [id]);

    if (!member) {
        return <p>Cargando...</p>;
    }

    return (
        <Container>
            <ImageSection>
                <ProfileImage src={member.fotoPerfil} alt={`${member.nombre} ${member.apellido}`} />
            </ImageSection>
            <InfoSection>
                <Name>
                    {member.nombre} {member.apellido}
                </Name>
                <Position>{member.posicion}</Position>
                {member.matriculaProf && ( // Renderizar solo si matriculaProf existe
                    <Matricula>
                        Matrícula Profesional: {member.matriculaProf}
                    </Matricula>
                )}
                <Experiencia>
                    <strong>Experiencia:</strong>
                    {member.experiencia && member.experiencia.length > 0 ? (
                        <ul>
                            {member.experiencia.map((exp, index) => (
                                <li key={index}>{exp}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No especificada</p>
                    )}
                </Experiencia>
                <BackButton onClick={() => navigate("/aboutUs")}>Volver</BackButton>
            </InfoSection>
        </Container>
    );
};

export default TeamMemberDetailView;

