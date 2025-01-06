import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

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
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  min-height: 150px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;

  &:hover {
    background-color: #45a049;
  }
`;

const BackButton = styled(Button)`
  background-color: #f44336;
  margin-top: 20px;

  &:hover {
    background-color: #e53935;
  }
`;

const ImagePreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  img {
    max-width: 100%;
    height: auto;
    max-height: 200px;
    border-radius: 5px;
  }
`;

const ImageGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

  img {
    max-width: 100px;
    max-height: 100px;
    object-fit: cover;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const API_URL = process.env.REACT_APP_API_URL;

const BlogModify = () => {
  const { id } = useParams(); // Obtener el ID del blog desde los parámetros de la URL
  const [blog, setBlog] = useState(null);
  const [newImages, setNewImages] = useState([]); // Para manejar las nuevas imágenes
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los detalles del blog
    axios
      .get(`${API_URL}/blog/${id}`, {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error al obtener los detalles del blog");
      });
  }, [id]);

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setBlog((prev) => ({
      ...prev,
      imagenesBlog: [...prev.imagenesBlog, ...previews],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("contenidoBlog", blog.contenidoBlog);
    newImages.forEach((image) => formData.append("imagenesBlog", image));

    axios
      .put(`${API_URL}/blog/${id}`, formData, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Blog actualizado exitosamente");
        navigate("/all-blogs");
      })
      .catch((error) => {
        console.log(error);
        alert("Error al actualizar el blog");
      });
  };

  if (!blog) return <p>Cargando...</p>;

  return (
    <Container>
      <Title>Editar Blog</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Título</Label>
          <Input type="text" value={blog.tituloBlog} disabled />
        </div>
        <div>
          <Label>Autor</Label>
          <Input
            type="text"
            value={`${blog.autorBlog.teamMember.nombre} ${blog.autorBlog.teamMember.apellido}`}
            disabled
          />
        </div>
        <div>
          <Label>Contenido</Label>
          <TextArea
            value={blog.contenidoBlog}
            onChange={(e) => setBlog({ ...blog, contenidoBlog: e.target.value })}
          />
        </div>
        <div>
          <Label>Imágenes Actuales</Label>
          <ImageGallery>
            {blog.imagenesBlog.map((img, index) => (
              <img key={index} src={img} alt={`Imagen ${index + 1}`} />
            ))}
          </ImageGallery>
          <Label>Nuevas Imágenes</Label>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
          />
        </div>
        <Button type="submit">Actualizar Blog</Button>
      </Form>
      <BackButton type="button" onClick={() => navigate(-1)}>
        Volver Atrás
      </BackButton>
    </Container>
  );
};

export default BlogModify;
