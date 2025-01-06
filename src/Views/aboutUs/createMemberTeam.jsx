import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const API_URL = process.env.REACT_APP_API_URL; 

const CreateTeamMemberForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        carnetIdentidad: '',
        matriculaProf: '',
        experiencia: [],
        posicion: '',
        abreviacionCargo: '',
        isPhysiotherapeust: false,
        fotoPerfil: null,
    });
    const [newExperience, setNewExperience] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleExperienceChange = (e) => {
        setNewExperience(e.target.value);
    };

    const handleAddExperience = () => {
        if (newExperience.trim()) {
            setFormData((prevState) => ({
                ...prevState,
                experiencia: [...prevState.experiencia, newExperience],
            }));
            setNewExperience('');
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, fotoPerfil: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'experiencia') {
                formData.experiencia.forEach((exp) => {
                    formDataToSend.append('experiencia', exp);
                });
            } else {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post(
                `${API_URL}/team`,
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "x-access-token": localStorage.getItem("token"),
                    }
                }
            );
            if (response.data) {
                alert("Miembro del equipo creado exitosamente");
                navigate("/admin");  // Redirige al administrador después de crear el miembro
            }
        } catch (err) {
            setError("Hubo un problema al crear al miembro del equipo.");
            console.error(err);
        }
    };

    const handleGoBack = () => {
        navigate(-1);  // Regresa a la página anterior
    };

    return (
        <FormContainer>
            <FormTitle>Crear Nuevo Miembro del Equipo</FormTitle>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleSubmit}>
                <InputField>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                    />
                </InputField>

                <InputField>
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleInputChange}
                        required
                    />
                </InputField>

                <InputField>
                    <Label htmlFor="carnetIdentidad">Carnet de Identidad</Label>
                    <Input
                        type="text"
                        id="carnetIdentidad"
                        name="carnetIdentidad"
                        value={formData.carnetIdentidad}
                        onChange={handleInputChange}
                        required
                    />
                </InputField>

                <InputField>
                    <Label htmlFor="matriculaProf">Matrícula Profesional</Label>
                    <Input
                        type="text"
                        id="matriculaProf"
                        name="matriculaProf"
                        value={formData.matriculaProf}
                        onChange={handleInputChange}
                    />
                </InputField>

                <InputField>
                    <Label htmlFor="experiencia">Experiencia</Label>
                    <ExperienceContainer>
                        <Input
                            type="text"
                            id="experiencia"
                            value={newExperience}
                            onChange={handleExperienceChange}
                        />
                        <Button type="button" onClick={handleAddExperience}>Agregar experiencia</Button>
                    </ExperienceContainer>
                    <ul>
                        {formData.experiencia.map((exp, index) => (
                            <li key={index}>{exp}</li>
                        ))}
                    </ul>
                </InputField>

                <InputField>
                    <Label htmlFor="posicion">Posición</Label>
                    <Input
                        type="text"
                        id="posicion"
                        name="posicion"
                        value={formData.posicion}
                        onChange={handleInputChange}
                        required
                    />
                </InputField>

                <InputField>
                    <Label htmlFor="abreviacionCargo">Abreviación de Cargo</Label>
                    <Input
                        type="text"
                        id="abreviacionCargo"
                        name="abreviacionCargo"
                        value={formData.abreviacionCargo}
                        onChange={handleInputChange}
                    />
                </InputField>

                <InputField>
                    <Label htmlFor="isPhysiotherapeust">¿Es fisioterapeuta?</Label>
                    <Select
                        name="isPhysiotherapeust"
                        value={formData.isPhysiotherapeust}
                        onChange={handleInputChange}
                    >
                        <option value={false}>No</option>
                        <option value={true}>Sí</option>
                    </Select>
                </InputField>

                <InputField>
                    <Label htmlFor="fotoPerfil">Foto de Perfil</Label>
                    <Input
                        type="file"
                        id="fotoPerfil"
                        name="fotoPerfil"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </InputField>

                <SubmitButton type="submit">Crear Miembro del Equipo</SubmitButton>
                <BackButton type="button" onClick={handleGoBack}>Volver atrás</BackButton>
            </Form>
        </FormContainer>
    );
};

// Styled Components
const FormContainer = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const InputField = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    font-size: 14px;
    color: #333;
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const Button = styled.button`
    margin-top: 10px;
    background-color: #218838;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
`;

const ExperienceContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const SubmitButton = styled.button`
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #218838;
    }
`;

const BackButton = styled.button`
    padding: 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s;
    &:hover {
        background-color: #c82333;
    }
`;

const ErrorMessage = styled.p`
    color: #e74c3c;
    text-align: center;
    margin-bottom: 20px;
`;

export default CreateTeamMemberForm;
