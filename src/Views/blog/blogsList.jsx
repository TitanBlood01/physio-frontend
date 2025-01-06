import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
  height: 100vh;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const BlogTable = styled.table`
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: #4caf50;
  color: white;
  font-size: 1.1rem;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const ViewButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #45a049;
  }
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #45a049;
  }
`;

const BackButton = styled(Button)`
  background-color: #f44336;
  margin-bottom: 20px;

  &:hover {
    background-color: #e53935;
  }
`;

const API_URL = process.env.REACT_APP_API_URL;

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Obtener el ID del usuario logueado

  useEffect(() => {
    // Obtener todos los blogs
    axios
      .get(`${API_URL}/blog`, {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        // Filtrar los blogs para mostrar solo los del usuario logueado
        const userBlogs = response.data.filter((blog) => blog.autorBlog._id === userId);
        setBlogs(userBlogs);
      })
      .catch((error) => {
        console.log(error);
        alert("Error al cargar los blogs");
      });
  }, [userId]);

  const handleViewClick = (blogId) => {
    // Redirigir a la página de detalles y edición del blog
    navigate(`/blogs/${blogId}`);
  };

  return (
    <Container>
      <Title>Lista de Blogs</Title>
      <BlogTable>
        <thead>
          <tr>
            <TableHeader>Título</TableHeader>
            <TableHeader>Autor</TableHeader>
            <TableHeader>Acciones</TableHeader>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <TableRow key={blog._id}>
              <TableCell>{blog.tituloBlog}</TableCell>
              <TableCell>{`${blog.autorBlog.teamMember.nombre} ${blog.autorBlog.teamMember.apellido}`}</TableCell>
              <TableCell>
                <ViewButton onClick={() => handleViewClick(blog._id)}>
                  Ver/Editar
                </ViewButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </BlogTable>
      <BackButton type="button" onClick={() => navigate(-1)}>
        Volver Atrás
      </BackButton>
    </Container>
  );
};

export default BlogList;
