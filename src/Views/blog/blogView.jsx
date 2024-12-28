import axios from "axios";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

// Contenedor principal de la vista
const BlogsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

// Contenedor del botón de inicio de sesión
const LoginButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 10px 20px 10px 20px;
  background-color: ${({ theme }) => theme.colors.navbarBackground};
`;

// Botón de inicio de sesión
const LoginButton = styled.button`
  background-color: #416434;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  margin-right: 40px; /* Añade margen derecho al botón */

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

// Título de introducción
const Title = styled.h2`
  margin-bottom: 10px;
`;

// Subtítulo/Descripción
const Subtitle = styled.p`
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

// Contenedor para los blogs
const BlogsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Máximo 5 por fila */
  gap: 20px;
  width: 80%;
  overflow: hidden; /* Esconde el desbordamiento */

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr); /* Máximo 4 por fila */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* Máximo 2 por fila */
  }

  @media (max-width: 480px) {
    display: flex;
    flex-direction: column; /* Apilar los elementos en columna */
    gap: 10px; /* Espaciado entre los blogs */
    width: 100%;
    overflow-y: auto; /* Desplazamiento vertical */
    max-height: 90vh; /* Ajuste de la altura máxima para móviles */
  }
`;


// Contenedor individual de cada blog
const BlogCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
  }
`;

// Imagen del blog
const BlogImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

// Información del blog
const BlogInfo = styled.div`
  padding: 10px;
  text-align: center;

  h3 {
    margin: 5px 0;
    font-size: 16px;
  }

  p {
    margin: 2px 0;
    font-size: 14px;
    color: #777;
  }
`;

function BlogsView() {
  const [blogs, setBlogs] = useState([]); // Estado para almacenar los blogs
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate();

  // Obtener blogs del servidor cuando el componente se monta
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://physio-backend-1l1v.onrender.com/api/blog"); // URL de tu API para obtener los blogs
        if (!response.ok) {
          throw new Error("Error al obtener los blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Función para manejar el clic en una tarjeta de blog
  const handleClick = (blogId) => {
    navigate(`/blog/${blogId}`); // Redirigir a la página del detalle del blog
  };

  const handleLoginClick = () => {
    navigate("/login"); // Redirige a la vista de login
  };

  if (loading) return <p>Cargando blogs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <BlogsContainer>
      {/* Contenedor del botón debajo del Navbar */}
      <LoginButtonContainer>
        <LoginButton onClick={handleLoginClick}>Iniciar sesión (Solo trabajadores)</LoginButton>
      </LoginButtonContainer>

      <Title>Bienvenido a Nuestros Blogs</Title>
      <Subtitle>Encuentra artículos interesantes y casos anteriores que podrían ayudarte.</Subtitle>
      <BlogsGrid>
        {blogs.map((blog) => (
          <BlogCard key={blog._id} onClick={() => handleClick(blog._id)}>
            <BlogImage src={blog.imagenesBlog[0]} alt={blog.tituloBlog} />
            <BlogInfo>
              <h3>{blog.tituloBlog}</h3>
              <p>Autor: {blog.autorBlog?.teamMember?.nombre} {blog.autorBlog?.teamMember?.apellido}</p>
              <p>Fecha: {new Date(blog.createdAt).toLocaleDateString()}</p>
            </BlogInfo>
          </BlogCard>
        ))}
      </BlogsGrid>
    </BlogsContainer>
  );
}

export default BlogsView;
