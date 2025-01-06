import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const BackButton = styled(Button)`
  background-color: #f44336;

  &:hover {
    background-color: #e53935;
  }
`;

const API_URL = process.env.REACT_APP_API_URL;

const ServiceCreate = () => {
  const [formData, setFormData] = useState({
    tituloService: "",
    infoService: "",
    descriptionService: "",
    imageService: null,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, imageService: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const serviceData = new FormData();
    serviceData.append("tituloService", formData.tituloService);
    serviceData.append("infoService", formData.infoService);
    serviceData.append("descriptionService", formData.descriptionService);

    if (formData.imageService) {
      serviceData.append("imageService", formData.imageService);
    }

    try {
      const response = await axios.post(`${API_URL}/services`, serviceData, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
        },
      });

      alert("Servicio creado exitosamente");
      navigate("/service-management"); // Ruta a la lista de servicios
    } catch (error) {
      console.error("Error al crear el servicio:", error);
      setError("No se pudo crear el servicio. Intente de nuevo.");
    }
  };

  return (
    <Container>
      <Title>Crear Nuevo Servicio</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="tituloService"
          placeholder="Título del Servicio"
          value={formData.tituloService}
          onChange={handleChange}
          required
        />
        <TextArea
          name="infoService"
          placeholder="Información del Servicio"
          value={formData.infoService}
          onChange={handleChange}
          required
        />
        <TextArea
          name="descriptionService"
          placeholder="Descripción Detallada"
          value={formData.descriptionService}
          onChange={handleChange}
          required
        />
        <Input
          type="file"
          name="imageService"
          accept="image/*"
          onChange={handleFileChange}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="submit">Crear Servicio</Button>
      <BackButton type="button" onClick={() => navigate(-1)}>
        Volver Atrás
      </BackButton>
      </Form>
    </Container>
  );
};

export default ServiceCreate;
