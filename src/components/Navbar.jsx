import React, { useState } from "react";
import { styled } from "styled-components";
import BurguerButton from "./BurguerButton";
import PhysioActiveLogo from "../assets/PhysioActive.png";
import { Link } from "react-router-dom";

function Navbar() {

  const [clicked, setClicked] = useState(false)
  const handleClick = () => {
    //cuando esta true lo pasa a false y vice versa
    setClicked(!clicked)
  }
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo src={PhysioActiveLogo} alt="Physio Active Logo" />
        <TextContainer>
          <LogoText>Physio <span> Active</span></LogoText>
          <Subtitle>CENTRO DE FISIOTERAPIA Y KINESIOLOGIA</Subtitle>
          <Subtitle2>Medicina Deportiva</Subtitle2>
        </TextContainer>
      </LogoContainer>
      <NavContainer>
        <div className={`links ${clicked ? 'active' : ''}`}>
          <Link to="/">Inicio</Link>
          <Link to="/servicios">Servicios</Link>
          <Link to="/aboutUs">Sobre Nosotros</Link>
          <Link to="/">Blog</Link>
          <Link to="/contactUs">Contacto</Link>
        </div>
        <div className="burguer">
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <BgDiv className={`initial ${clicked ? 'active' : ''}`}></BgDiv>
      </NavContainer>
    </HeaderContainer>
  );
}

export default Navbar

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: ${({theme}) => theme.colors.headerBg};
`

const LogoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center
`

const Logo = styled.img`
width: 80px;
height: auto;
margin-right: 0.5rem;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const LogoText = styled.h2`
  font-family: "Brush Script MT", cursive;
  color: #25405A;
  font-size: 2.2rem;
  font-weigh: 400;
  margin: 0;
  margin-left: 48px;
  position: relative;
  top: -2px;
  transform: scaleX(1.5);
  span{
    font-weight: bold;
  }

`
const Subtitle = styled.p`
    font-family: Arial, sans-serif;
    color: #25405A;
    font-size: 0.7rem; /* Tamaño de letra más pequeño */
    margin: 0; /* Sin márgenes */
    position: relative;
    top: -2px;
`

const Subtitle2 = styled.h2`
  font-family: "Brush Script MT", cursive;
  color: #416434;
  font-size: 1.5rem;
  font-weigh: 400;
  margin: 0;
  margin-left: 48px;
  position: relative;
  top: -2px;
  transform: scaleX(1.5);
  span{
    font-weight: bold;
  }
`

const NavContainer = styled.nav`
   padding: 1.5rem;
   background-color: #416434;
   display: flex;
   align-items: center;
   justify-content: space-between; 
   a{
       color: white;
       text-decoration: none;
       margin-right: 3rem;
   }
    .links{
      position: absolute;
      top: -700px;
      left: -2000px;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      z-index: 2;
      transition: all .5s ease;
      a{
         color: white;
         font-size: 2rem;
         display: block;
      }
      @media(min-width: 768px) {
         position: initial;  
         margin: 0;
         a{
            font-size: 1rem;
            color: white;
            display: inline;
         }      
      }
    }
    .links.active{
      width: 100%;
      display: block;
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      top: 30%;
      left: 0;
      right: 0;
      text-align: center;
      z-index: 2;
      a{
        font-size: 2rem;
        margin-top: 1rem;
        color: white;
      }
    }
    .burguer{
    z-index: 3;
      @media(min-width: 768px){
         display: none;
      }
    }
`


const BgDiv = styled.div`
  background-color: #416434;
  position: absolute;
  top: -700px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: all .6s ease;
  &.active{
    border-radius: 0 0 80% 0;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
  }
  @media(min-width: 768px) {
    display: none;
  }
`
