import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const API_URL = process.env.REACT_APP_API_URL;

const TeamList = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await axios.get(`${API_URL}/team`, {
                    headers: {
                        "x-access-token": localStorage.getItem("token"),
                    },
                });
                setTeamMembers(response.data);
            } catch (err) {
                setError("Error al obtener los miembros del equipo.");
            }
        };
        fetchTeam();
    }, []);

    const handleEdit = (id) => {
        navigate(`/team/edit/${id}`);
    };

    const goBack = () => {
        navigate(-1); // Navega a la página anterior
    };

    return (
        <TableContainer>
            <ContentWrapper>
                <h2>Lista de Miembros del Equipo</h2>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <StyledTable>
                    <thead>
                        <tr>
                            <th>Carnet de Identidad</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamMembers.map((member) => (
                            <tr key={member._id}>
                                <td>{member.carnetIdentidad}</td>
                                <td>{member.nombre}</td>
                                <td>{member.apellido}</td>
                                <td>
                                    <EditButton onClick={() => handleEdit(member._id)}>
                                        Modificar
                                    </EditButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
                <BackButton onClick={goBack}>Atrás</BackButton>
            </ContentWrapper>
        </TableContainer>
    );
};

export default TeamList;

// Styled Components
const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 80vh;
  background-color: #f9f9f9;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  text-align: center;

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  th,
  td {
    text-align: left;
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  td {
    text-align: center;
  }

  @media (max-width: 768px) {
    th,
    td {
      padding: 8px;
      font-size: 14px;
    }

    td {
      word-wrap: break-word;
    }
  }

  @media (max-width: 480px) {
    th,
    td {
      padding: 5px;
      font-size: 12px;
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 20px;
`;

const EditButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #45a049;
  }
`;

const BackButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #1e88e5;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`;
