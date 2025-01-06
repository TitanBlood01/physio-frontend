import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 20px;
  background-color: #f7f7f7;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
`;

const ImagePreview = styled.img`
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const BackButton = styled(Button)`
  background-color: #f44336;
  margin-top: 10px;

  &:hover {
    background-color: #e53935;
  }
`;

const API_URL = process.env.REACT_APP_API_URL;

const EditService = () => {
    const { serviceId } = useParams();
    const [formData, setFormData] = useState({
        tituloService: "",
        infoService: "",
        descriptionService: "",
        imageService: "",
    });
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`${API_URL}/services/${serviceId}`);
                const { tituloService, infoService, descriptionService, imageService } = response.data;
                setFormData({ tituloService, infoService, descriptionService, imageService });
                setPreview(imageService);
            } catch (error) {
                console.error("Error al obtener el servicio:", error);
            }
        };

        fetchService();
    }, [serviceId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({ ...prevData, imageService: file }));
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = new FormData();
        updatedData.append("tituloService", formData.tituloService);
        updatedData.append("infoService", formData.infoService);
        updatedData.append("descriptionService", formData.descriptionService);

        if (formData.imageService instanceof File) {
            updatedData.append("imageService", formData.imageService);
        }

        try {
            await axios.put(`${API_URL}/services/${serviceId}`, updatedData, {
                headers: { "x-access-token": localStorage.getItem("token"),"Content-Type": "multipart/form-data" },
            });
            alert("Servicio actualizado con éxito");
            navigate("/all-services");
        } catch (error) {
            console.error("Error al actualizar el servicio:", error);
            alert("No se pudo actualizar el servicio. Intente de nuevo.");
        }
    };

    return (
        <Container>
            <Title>Modificar Servicio</Title>
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
                {preview && <ImagePreview src={preview} alt="Vista previa de la imagen" />}
                <Input
                    type="file"
                    name="imageService"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <Button type="submit">Modificar Servicio</Button>
            </Form>
            <BackButton onClick={() => navigate(-1)}>Volver Atrás</BackButton>
        </Container>
    );
};

export default EditService;
