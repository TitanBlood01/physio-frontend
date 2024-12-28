import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CreateUserForm = () => {
    const [formData, setFormData] = useState({
        carnetIdentidad: '',
        password: '',
        roles: '', // Aunque el rol es por defecto "user", lo mantenemos aquí para posibles futuras modificaciones
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://physio-backend-1l1v.onrender.com/api/user", // Cambia la URL si es necesario
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": localStorage.getItem("token"), // Si tienes token de autenticación
                    }
                }
            );
            if (response.data) {
                alert("Usuario creado exitosamente");
                navigate("/admin"); // Redirige a la página de administración (ajusta si es necesario)
            }
        } catch (err) {
            setError("Hubo un problema al crear el usuario.");
            console.error(err);
        }
    };

    return (
        <FormContainer>
            <FormTitle>Crear Nuevo Usuario</FormTitle>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleSubmit}>
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
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </InputField>

                <InputField>
                    <Label htmlFor="roles">Roles (opcional)</Label>
                    <Input
                        type="text"
                        id="roles"
                        name="roles"
                        value={formData.roles}
                        onChange={handleInputChange}
                    />
                </InputField>

                <SubmitButton type="submit">Crear Usuario</SubmitButton>
            </Form>
        </FormContainer>
    );
};

// Styled Components

const FormContainer = styled.div`
    width: 100%;
    max-width: 500px;
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

const ErrorMessage = styled.p`
    color: #e74c3c;
    text-align: center;
    margin-bottom: 20px;
`;

export default CreateUserForm;
