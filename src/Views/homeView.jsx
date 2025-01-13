import React, { useState, useEffect } from "react";
import './homeView.css'
import styled from "styled-components";
import Slider from "react-slick";
import { homeCarouselImages, homeImagesSection2 } from "../assets/images.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { homeText } from "../utilities/texts.js";

const API_URL = process.env.REACT_APP_API_URL;

const HomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  position: relative;
  overflow: hidden;
`;

const FirstSection = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  position: relative;
  flex-direction: row;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px; /* Reduce el padding en pantallas pequeñas */
  }
`;

const LeftColumn = styled.div`
  flex: 65%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const ImageContainer = styled.div`
  width: 95%;
  max-width: 850px;
  height: 740px;
  overflow: hidden;
  .slick-slide img {
    width: 100%;
    height: 710px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    .slick-slide img {
      height: 250px; /* Hace que la altura de la imagen se ajuste automáticamente */
      max-height: 300px; /* Puedes definir un máximo de altura para pantallas pequeñas */
      object-fit: contain; /* Se asegura de que la imagen se ajuste sin recortarse */
       margin-top: 150px;
    }
  }
`;

const RightColumn = styled.div`
  flex: 35%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    padding-top: 10px; /* Ajusta el padding para acercar el texto */
  }
`;

const TextContainer = styled.div`
  width: 90%;
  background-color: #8db278;
  color: #fff;
  padding: 20px;
  border-radius: 8px;

   @media (max-width: 768px) {
    padding: 10px; /* Reduce el padding en pantallas pequeñas */
    margin-top: 0; /* Elimina cualquier margen extra en pantallas pequeñas */
  }
`;

const QuoteSection = styled.div`
  width: 100%;
  background-color: #253f5a;
  color: #fff;
  padding: 40px 0;
  position: relative;
  text-align: center;

  h2 {
    margin-bottom: 60px;
    font-size: 28px;
  }

  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

const QuoteContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que los testimonios se distribuyan en varias filas */
  justify-content: space-between;
  width: 80%;
  margin: auto;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center; /* Centra los testimonios en pantallas pequeñas */
  }
`;

const QuoteRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const Column = styled.div`
  flex: 1 1 45%;
  padding: 10px;
  
  @media (max-width: 768px) {
    flex: 1 1 100%;
    margin-bottom: 20px;
  }
`;

const QuoteText = styled.div`
  flex: 50%;
  font-size: 24px;
`;

const Author = styled.div`
  flex: 50%;
  font-size: 18px;
  text-align: right;
`;

// Nueva sección con imagen a la derecha
const SecondSection = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  width: 100%;
  position: relative;
  margin-top: 40px; /* Espacio adicional para separar de QuoteSection */
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TextLeft = styled.div`
  flex: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  color: #fff; /* Color de texto igual al de la primera sección */
  background-color: #8db278; /* Color de fondo igual que en FirstSection */

  h2 {
    font-size: 32px; /* Texto más grande */
  }

  p {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    flex: 100%;
  }
`;

const ImageRight = styled.div`
  flex: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  /* Centra las imágenes horizontalmente */
  background-color: #034a46; /* Fondo azul para las imágenes de la derecha */
  padding: 0 20px;  /* Agrega un padding a la izquierda y derecha para evitar que toquen el borde */

  @media (max-width: 768px) {
    flex: 100%;
  }
`;

const ImageStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%; /* Asegura que el contenedor ocupe todo el ancho disponible */
  align-items: center; /* Centra las imágenes dentro del contenedor */
  margin-top: 10px;
  margin-bottom: 10px;

  img {
    width: 90%; /* Puedes ajustar el tamaño de las imágenes para que no ocupen todo el ancho */
    height: 400px;
    object-fit: cover;
  }
`;

// Sección de novedades (últimos 3 blogs)
const BlogSection = styled.div`
  width: 100%;
  background-color: #f4f4f4;
  padding: 40px 0;
  text-align: center;

  h2 {
    margin-bottom: 40px;
    font-size: 28px;
  }
`;

const BlogContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 80%;
  margin: auto;
`;

const BlogCard = styled.div`
  width: 30%;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const BlogTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
`;

// Imagen del blog
const BlogImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  object-position: 50% 0%;
  border-radius: 8px 8px 0 0;
`;

const LinkList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;

  li {
    margin: 10px 0;
  }

  a {
    color: #ffffff; /* Cambia al color que prefieras */
    text-decoration: none;
    font-size: 16px;
    transition: color 0.3s;

    &:hover {
      color: rgb(0, 140, 255); /* Efecto hover */
    }
  }

  /* Estilos responsivos */
  @media (max-width: 768px) {
    margin: 15px 0;

    li {
      margin: 8px 0;
    }

    a {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    margin: 10px 0;

    li {
      margin: 5px 0;
    }

    a {
      font-size: 15px;
    }
  }
`;


// HomeView
function HomeView() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  // Obtener blogs del servidor cuando el componente se monta
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/blog`); // URL de tu API para obtener los blogs
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

  return (
    <HomeDiv>
      <FirstSection>
        <LeftColumn>
          <ImageContainer>
            <Slider {...settings}>
              {homeCarouselImages.map((image, index) => (
                <div key={index}>
                  <img src={image.src} alt={image.alt} />
                </div>
              ))}
            </Slider>
          </ImageContainer>
        </LeftColumn>
        <RightColumn>
          <TextContainer>
            <h2>{homeText.welcomeTitle}</h2>
            <p>{homeText.welcomeText}</p>
            <h2>{homeText.helpTitle}</h2>
            <p>{homeText.helpText}</p>
            <p>{homeText.helpText2}</p>
            <p>{homeText.helpText3}</p>
          </TextContainer>
        </RightColumn>
      </FirstSection>

      <QuoteSection>
        <h2>{homeText.testimonialsTitle}</h2>
        <QuoteContainer>
          <Column>
            <QuoteText>{homeText.testimonial1}</QuoteText>
            <Author>{homeText.author1}</Author>
          </Column>
          <Column>
            <QuoteText>{homeText.testimonial2}</QuoteText>
            <Author>{homeText.author2}</Author>
          </Column>
          <Column>
            <QuoteText>{homeText.testimonial3}</QuoteText>
            <Author>{homeText.author3}</Author>
          </Column>
          <Column>
            <QuoteText>{homeText.testimonial4}</QuoteText>
            <Author>{homeText.author4}</Author>
          </Column>
          <Column>
            <QuoteText>{homeText.testimonial5}</QuoteText>
            <Author>{homeText.author5}</Author>
          </Column>
          <Column>
            <QuoteText>{homeText.testimonial6}</QuoteText>
            <Author>{homeText.author6}</Author>
          </Column>
        </QuoteContainer>
      </QuoteSection>


      <SecondSection>
        <TextLeft>
          <h2>{homeText.secondSectionTitle}</h2>
          <p>{homeText.secondSectionText}</p>
          <p>{homeText.secondSectionText2}</p>
          <LinkList>
            {homeText.votationLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.text}👉🏻{link.url}
                </a>
              </li>
            ))}
          </LinkList>
          <p>{homeText.thanksText}</p>
        </TextLeft>
        <ImageRight>
          <ImageStack>
            <img src={homeImagesSection2.imagen1} alt="Image 1" />
            <img src={homeImagesSection2.imagen2} alt="Image 2" />
          </ImageStack>
        </ImageRight>
      </SecondSection>

      <BlogSection>
        <h2>Últimas Novedades</h2>
        {loading ? (
          <p>Cargando blogs...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <BlogContainer>
            {blogs.slice(0, 3).map((blog, index) => (
              <BlogCard key={index}>
                <BlogImage src={blog.imagenesBlog[0]} alt={blog.tituloBlog} />
                <BlogTitle>{blog.tituloBlog}</BlogTitle>
              </BlogCard>
            ))}
          </BlogContainer>
        )}
      </BlogSection>

    </HomeDiv>
  );
}

export default HomeView;
