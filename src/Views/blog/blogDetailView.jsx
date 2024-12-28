import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Contenedores principales
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const Title = styled.h1`
  margin-bottom: 10px;
  text-align: center;
`;

const AuthorInfo = styled.div`
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Content = styled.div`
  width: 80%;
  line-height: 1.6;
  font-size: 16px;
  text-align: justify;
  margin-bottom: 20px;
`;

const Media = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column; /* Apila las imágenes una debajo de la otra */
  align-items: center;     /* Centra las imágenes */
  width: 700px;             /* Hace que ocupe todo el ancho disponible */
  max-width: 1000px;       /* Establece un ancho máximo para que las imágenes no se expandan demasiado */
  margin: 20px auto;       /* Centra el contenedor Media en el centro de la pantalla */

  /* Media Query para pantallas más pequeñas (móviles) */
  @media (max-width: 768px) {
    max-width: 100%;        /* Asegura que en móviles no haya un límite máximo de ancho */
    margin: 10px;           /* Menor margen para pantallas más pequeñas */
  }
`;

const Image = styled.img`
  width: 100%;            /* Hace que la imagen ocupe el 100% del ancho del contenedor */
  height: auto;           /* Mantiene la proporción original */
  max-width: 100%;        /* Hace que no se agranden más allá del 100% del contenedor */
  border-radius: 8px;
  margin-bottom: 20px;    /* Espacio entre las imágenes */
  object-fit: contain;    /* Mantiene las proporciones sin distorsionar */

  /* Media Query para pantallas más pequeñas (móviles) */
  @media (max-width: 768px) {
    max-width: 100%;      /* Se asegura que las imágenes no se agranden demasiado en móviles */
    width: 100%;          /* También ajusta el ancho en móviles */
  }
`;

const Video = styled.video`
  width: 100%;
  max-width: 800px;
  border-radius: 8px;
`;

const BackButton = styled.button`
  margin-top: 20px;
  background-color: #45a049;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

function BlogDetailView() {
  const { blogId } = useParams(); // Obtener el ID del blog desde los parámetros de la URL
  console.log(blogId)
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/blog/${blogId}`);
        if (!response.ok) {
          throw new Error("Error al obtener el blog");
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) return <p>Cargando blog...</p>;
  if (error) return <p>{error}</p>;
  if (!blog) return <p>Blog no encontrado</p>;

  const { tituloBlog, contenidoBlog, imagenesBlog, videoBlog, autorBlog } = blog;

  return (
    <Container>
      <Title>{tituloBlog}</Title>
      <AuthorInfo>
        <p>
          Autor: {autorBlog.teamMember.nombre} {autorBlog.teamMember.apellido}
        </p>
        <p>Posición: {autorBlog.teamMember.posicion}</p>
        <p>Fecha: {new Date(blog.createdAt).toLocaleDateString()}</p>
      </AuthorInfo>
      {imagenesBlog && imagenesBlog.length > 0 && (
        <Media>
          {imagenesBlog.map((img, index) => (
            <Image key={index} src={img} alt={`Imagen ${index + 1}`} />
          ))}
        </Media>
      )}
      <Content>
        {contenidoBlog.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </Content>
      {videoBlog && (
        <Media>
          <Video controls>
            <source src={videoBlog} type="video/mp4" />
            Tu navegador no soporta la reproducción de videos.
          </Video>
        </Media>
      )}
      <BackButton onClick={() => navigate("/blog")}>Volver</BackButton>
    </Container>
  );
}

export default BlogDetailView;
