import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify"; // Importar las funciones necesarias
import "react-toastify/dist/ReactToastify.css"; // Importar el CSS necesario

// Estilos
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 700px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  min-height: 200px;
  resize: vertical;
`;

const FileInput = styled.input`
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #416434;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: #365b28;
  }
`;

const BackButton = styled.button`
  background-color: #ccc;
  color: #333;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;

  &:hover {
    background-color: #bbb;
  }
`;

const CreateBlog = () => {
    const [tituloBlog, setTituloBlog] = useState("");
    const [contenidoBlog, setContenidoBlog] = useState("");
    const [imagenesBlog, setImagenesBlog] = useState([]);
    const [videoBlog, setVideoBlog] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImagenesBlog(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Limpiar errores previos

        const formData = new FormData();
        formData.append("tituloBlog", tituloBlog);
        formData.append("contenidoBlog", contenidoBlog);
        formData.append("videoBlog", videoBlog);

        for (let i = 0; i < imagenesBlog.length; i++) {
            formData.append("imagenesBlog", imagenesBlog[i]);
        }

        try {
            const response = await axios.post(
                "http://localhost:4000/api/blog", // Asegúrate de que esta URL sea correcta
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "x-access-token": localStorage.getItem("token")
                    },
                }
            );
            console.log("Respuesta del servidor: ", response.data);

            if (response.data && response.data.message === "Blog creado con exito") {
                toast.success("Blog creado con éxito!", {
                    autoClose: 3000,
                    hideProgressBar: false,
                    
                });
                navigate("/admin"); // Redirige a la página de administración (ajusta si es necesario)
            } else {
                toast.error("Hubo un problema con la creación del blog.");
            }
        } catch (err) {
            console.error("Error al crear el blog: ", err);
            toast.error(err.response?.data?.message || "Error al crear el blog");
        }
    };

    const handleGoBack = () => {
        navigate(-1); // Navega a la página anterior
    };

    return (
        <Container>
            <Title>Crear Blog</Title>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Título del Blog</Label>
                    <Input
                        type="text"
                        value={tituloBlog}
                        onChange={(e) => setTituloBlog(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Contenido del Blog</Label>
                    <TextArea
                        value={contenidoBlog}
                        onChange={(e) => setContenidoBlog(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Imágenes del Blog</Label>
                    <FileInput
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Video del Blog (opcional)</Label>
                    <Input
                        type="text"
                        value={videoBlog}
                        onChange={(e) => setVideoBlog(e.target.value)}
                    />
                </FormGroup>
                <Button type="submit">Crear Blog</Button>
            </Form>
            <BackButton onClick={handleGoBack}>Volver Atrás</BackButton>
            <ToastContainer /> {/* Aquí se agregan las notificaciones */}
        </Container>
    );
};

export default CreateBlog;

