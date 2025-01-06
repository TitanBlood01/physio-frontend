import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const API_URL = process.env.REACT_APP_API_URL;

const EditTeamMember = () => {
    const { id } = useParams(); // Obtén el id del miembro de la URL
    const [memberData, setMemberData] = useState(null);
    const [updatedMember, setUpdatedMember] = useState({});
    const [error, setError] = useState("");
    const [newExperience, setNewExperience] = useState(""); // Estado para la nueva experiencia
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await axios.get(`${API_URL}/team/${id}`, {
                    headers: {
                        "x-access-token": localStorage.getItem("token"),
                    },
                });
                setMemberData(response.data.memberTeam);
                setUpdatedMember(response.data.memberTeam); // Establecer los datos iniciales
            } catch (err) {
                setError("Error al obtener los datos del miembro.");
            }
        };
        fetchMemberData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedMember({
            ...updatedMember,
            [name]: value,
        });
    };

    const handleExperienceChange = (e) => {
        setNewExperience(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdatedMember({
                ...updatedMember,
                fotoPerfil: file,  // Guardamos el archivo directamente en el estado
            });
        }
    };

    const addExperience = () => {
        if (newExperience.trim()) {
            setUpdatedMember({
                ...updatedMember,
                experiencia: [...updatedMember.experiencia, newExperience],
            });
            setNewExperience(""); // Limpiar el campo
        }
    };

    const removeExperience = (index, e) => {
        e.preventDefault();

        const updatedExperience = updatedMember.experiencia.filter((_, i) => i !== index);
        setUpdatedMember({
            ...updatedMember,
            experiencia: updatedExperience,
        });
        alert("Experiencia eliminada correctamente");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(updatedMember).forEach((key) => {
            if (key === "experiencia") {
                updatedMember.experiencia.forEach((exp) => {
                    formDataToSend.append("experiencia", exp);
                });
            } else if (key === "fotoPerfil") {
                if (updatedMember.fotoPerfil) {
                    formDataToSend.append("fotoPerfil", updatedMember.fotoPerfil);  // Agregar la imagen al FormData
                }
            } else {
                formDataToSend.append(key, updatedMember[key]);
            }
        });

        try {
            const response = await axios.put(
                `${API_URL}/team/${id}`,
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "x-access-token": localStorage.getItem("token"),
                    },
                }
            );
            alert("Miembro actualizado correctamente");
            navigate("/all-team-members");
        } catch (err) {
            alert("Error al actualizar los datos del miembro.");
        }
    };

    const handleGoBack = () => {
        navigate(-1); // Redirige a la página anterior sin hacer petición al servidor
    };

    if (!memberData) {
        return <div>Cargando...</div>;
    }

    return (
        <Container>
            <h2>Editar Miembro del Equipo</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <EditForm onSubmit={handleSubmit}>
                <FieldWrapper>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={updatedMember.nombre}
                        onChange={handleInputChange}
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="apellido"
                        value={updatedMember.apellido}
                        onChange={handleInputChange}
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <label>Matrícula Profesional:</label>
                    <input
                        type="text"
                        name="matriculaProf"
                        value={updatedMember.matriculaProf}
                        onChange={handleInputChange}
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <label>Experiencia:</label>
                    <ExperienceWrapper>
                        <input
                            type="text"
                            value={newExperience}
                            onChange={handleExperienceChange}
                            placeholder="Agregar experiencia"
                        />
                        <AddButton type="button" onClick={addExperience}>
                            Agregar
                        </AddButton>
                    </ExperienceWrapper>
                    <ul>
                        {updatedMember.experiencia.map((exp, index) => (
                            <ExperienceItem key={index}>
                                {exp}
                                <RemoveButton onClick={(e) => removeExperience(index, e)}>
                                    Eliminar
                                </RemoveButton>
                            </ExperienceItem>
                        ))}
                    </ul>
                </FieldWrapper>
                <FieldWrapper>
                    <label>Foto de Perfil:</label>
                    <PreviewWrapper>
                        {updatedMember.fotoPerfil && typeof updatedMember.fotoPerfil === 'string' ? (
                            <ImagePreview src={updatedMember.fotoPerfil} alt="Foto de perfil" />
                        ) : (
                            <ImagePreview src={URL.createObjectURL(updatedMember.fotoPerfil)} alt="Foto de perfil" />
                        )}
                        <input
                            type="file"
                            name="fotoPerfil"
                            onChange={handleImageChange}
                        />
                    </PreviewWrapper>
                </FieldWrapper>
                <SubmitButton type="submit">Guardar Cambios</SubmitButton>
            </EditForm>
            <BackButton onClick={handleGoBack}>Atrás</BackButton> {/* Botón Atrás */}
        </Container>
    );
};

export default EditTeamMember;


// Styled Components

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 20px;
`;

const EditForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const FieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    label {
        font-size: 16px;
        font-weight: bold;
    }

    input {
        padding: 8px;
        font-size: 14px;
        width: 100%;
        box-sizing: border-box;
    }
`;

const ExperienceWrapper = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
`;

const AddButton = styled.button`
    background-color: #4caf50;
    color: white;
    padding: 8px;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

const ExperienceItem = styled.li`
    font-size: 14px;
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
`;

const RemoveButton = styled.button`
    background-color: #f44336;
    color: white;
    padding: 5px;
    border: none;
    cursor: pointer;
    font-size: 12px;

    &:hover {
        background-color: #e53935;
    }
`;

const ImagePreview = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-bottom: 10px;
`;

const PreviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SubmitButton = styled.button`
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

const BackButton = styled.button`
    background-color: #f44336;
    color: white;
    padding: 10px;
    border: none;
    margin-top: 20px;
    cursor: pointer;

    &:hover {
        background-color: #e53935;
    }
`;
