import React from "react";
import './homeView.css'
import styled from "styled-components";
import Slider from "react-slick";
import { homeCarouselImages } from "../assets/images.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { homeText } from "../utilities/texts.js";


const HomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  position: relative;
  overflow: hidden
`;

// Primera sección: Dos columnas
const FirstSection = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  position: relative;
  flex-direction: row;
  overflow: hidden;

  @media (max-width: 1024px) {
    /* Ajuste para pantallas medianas como laptops de 15 pulgadas */
    flex-direction: row;
    padding: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  flex: 65%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    flex: 60%; /* Ajusta la proporción para pantallas medianas */
  }

  @media (max-width: 768px) {
    width: 100%; /* Ocupa todo el ancho en pantallas pequeñas */
    margin-bottom: 20px; /* Espacio inferior para separar la imagen del texto */
  }
`;

const ImageContainer = styled.div`
  width: 95%;
  max-width: 850px;
  height: 740px;
  overflow: hidden;
  .slick-slide img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  @media (max-width: 1024px) {
    width: 80%;
    max-width: 750px; /* Ajusta el ancho máximo en pantallas medianas */
    height: 650px; /* Reduce la altura en pantallas medianas */
  }  
`;

const RightColumn = styled.div`
  flex: 35%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    flex: 40%; /* Aumenta el tamaño para pantallas medianas */
    padding-right: 20px; /* Agrega más espacio al lado derecho del texto */
  }

  @media (max-width: 768px) {
    width: 100%; /* Ocupa todo el ancho en pantallas pequeñas */
  }
`;

const TextContainer = styled.div`
  width: 90%;
  background-color: #8db278; /* Fondo verde */
  color: #fff;
  padding: 20px;
  border-radius: 8px;

  @media (max-width: 1024px) {
    padding: 20px 40px; /* Agrega más padding al texto en pantallas medianas */
  }
`;

// Segunda sección: Cita con fondo azul oscuro
const QuoteSection = styled.div`
  width: 100%;
  background-color: #253f5a; /* Azul oscuro */
  color: #fff;
  padding: 40px 0;
  position: relative;
  text-align: center;
   h2 {
    margin-bottom: 60px; /* Espacio inferior para separar el título de las citas */
    font-size: 28px;
  }

  @media (max-width: 768px) {
    padding: 20px 0; /* Reduce el padding en pantallas pequeñas */
  }
`;

const QuoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80%;
  margin: auto;

  @media (max-width: 768px) {
    flex-direction: column; /* Cambia a una columna en pantallas más pequeñas */
    width: 100%; /* Ocupa todo el ancho */
  }
`;

const QuoteRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

// Estilo para las columnas de texto
const Column = styled.div`
  flex: 1;
  padding: 10px;

  @media (max-width: 768px) {
    margin-bottom: 20px; /* Espacio inferior entre las citas en pantallas pequeñas */
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


function HomeView() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true, // Activa el cambio automático de imagen
    autoplaySpeed: 5000,
  };

  return (
    <HomeDiv>
    {/* Primera sección */}
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

    {/* Segunda sección */}
    <QuoteSection>
      <h2>{homeText.testimonialsTitle}</h2>
      <QuoteContainer>
        <QuoteRow>
          <Column>
            <QuoteText>{homeText.testimonial1}</QuoteText>
            <Author>{homeText.author1}</Author>
          </Column>
          <Column>
            <QuoteText>{homeText.testimonial2}</QuoteText>
            <Author>{homeText.author2}</Author>
          </Column>
        </QuoteRow>
      </QuoteContainer>
    </QuoteSection>
  </HomeDiv>
  );
}

export default HomeView;