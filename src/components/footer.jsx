import React from "react";
import { styled } from "styled-components";
import fb from "../assets/facebook.png";
import tiktok from "../assets/tiktok.png";
import linkedin from "../assets/linkedin.png";
import insta from "../assets/instagram.png";
import youtube from "../assets/youtube.png";
//import { DoctorImage } from "../assets/images.js";
import DoctorImage from "../assets/Doctor.JPG";

function Footer() {
    return (
        <FooterContainer>
            <div className="sb__footer section__padding">
                <div className="sb__footer-links">
                    <div className="sb__footer-links_div">
                        <h4>Nuestras Redes Sociales</h4>
                        <div className="socialmedia">
                            <SocialLink href="https://www.facebook.com/profile.php?id=100009085525842" target="_blank" rel="noopener noreferrer">
                                <SocialIcon><img src={fb} alt="" /></SocialIcon>
                            </SocialLink>
                            <SocialLink href="https://www.instagram.com/physio_active_lpz" target="_blank" rel="noopener noreferrer">
                                <SocialIcon><img src={insta} alt="" /></SocialIcon>
                            </SocialLink>
                            <SocialLink href="https://www.facebook.com/tu_perfil" target="_blank" rel="noopener noreferrer">
                                <SocialIcon><img src={linkedin} alt="" /></SocialIcon>
                            </SocialLink>
                            <SocialLink href="https://www.tiktok.com/@physioactive1326?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">
                                <SocialIcon><img src={tiktok} alt="" /></SocialIcon>
                            </SocialLink>
                            <SocialLink href="https://www.facebook.com/tu_perfil" target="_blank" rel="noopener noreferrer">
                                <SocialIcon><img src={youtube} alt="" /></SocialIcon>
                            </SocialLink>
                        </div>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Ubicanos</h4>
                        <p>Calle 5 Achumani N°572, edificio Augusto Gamarra, planta baja</p>
                        <p>720-97577</p>
                        <p>physioactivefisioterapia@gmail.com</p>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Informacion del Doctor</h4>
                        <DoctorInfoContainer>
                            <ProfileImage>
                                <img src={DoctorImage} alt="Doctor" />
                            </ProfileImage>
                            <div className="ownerInformation">
                                <p>Dr Adolfo Dávila Careaga</p>
                                <p>Fisioterapia - Kinesiologia MP-D/50</p>
                                <p>Esp. Medicina Deportiva Neurofisiatria</p>
                            </div>
                        </DoctorInfoContainer>
                    </div>
                </div>

                <hr></hr>

                <div className="sb__footer-below">
                    <div className="sb__footer-copyright">
                        <p>
                            @{new Date().getFullYear()} Physio Active. Todos los derechos reservados.
                        </p>
                    </div>
                    <div className="sb__footer-below-links">
                        <a href="/terms"><div><p>Terms & Conditions</p></div></a>
                        <a href="/privacy"><div><p>Privacy</p></div></a>
                        <a href="/security"><div><p>Security</p></div></a>
                        <a href="/cookie"><div><p>Cookie Declaration</p></div></a>
                    </div>
                </div>

            </div>
        </FooterContainer>
    )
}

export default Footer

const FooterContainer = styled.footer`
   background-color: ${({ theme }) => theme.colors.footerBg};
   .section__padding{
        padding: 4rem 4rem;
   }
   .sb__footer{
        display: flex;
        flex-direction: column;
   } 
   .sb__footer-links{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        text-align: left;
        margin-bottom: 2rem; 
   }

   .sb__footer-links_div{
        width: 150px;
        margin: 1rem;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        color: white;
   }

   a{
        color: rgb(175, 175, 179);
        text-decoration: none;
   }
   
   .socialmedia{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        width: 225px;
        justify-content: flex-start;
   }

   .ownerInformation{
        width: 215px;
        font-size: 12px;
        line-height: 15px;
        margin: 0.5rem 0;
        color: #25405A;
   }

   .sb__footer-links_div h4{
        font-size: 14px;
        line-height: 17px;
        margin-bottom: 0.9rem;
        color: #25405A;
        text-align: center;
   } 

   .sb__footer-links_div p{
        width: 215px;
        font-size: 12px;
        line-height: 15px;
        margin: 0.5rem 0;
        color: #25405A;
   }

   .sb__footer-below{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 0.2rem;
   }

   .sb__footer-below-links{
        display: flex;
        flex-direction: row;
   }

   .sb__footer-below-links p{
        font-size: 13px;
        line-height: 15px;
        margin-left: 2rem;
        color: #25405A;
        font-weight: 600;
   }

   hr{
        border: none;
        border-top: 1px solid #25405A;;
        width: 100%;
   }

   .sb__footer-copyright p{
        font-size: 13px;
        line-height: 15px;
        color: rgb(255,255,255);
        font-weight: 600;
        color: #25405A;
   }

   @media screen and (max-width: 850px) {
        .sb__footer-heading h1{
            font-size: 44px;
            line-height: 50px;
        }
   }

   @media screen and (max-width: 550px){
        .sb__footer-heading h1{
            font-size: 34px;
            line-weight: 42px;
        }
        
        .sb__footer-links div{
            margin: 1rem 0;
        }

        .sb__footer-btn p{
            fontsize: 14px;
            line-height: 20px;
        }

        .sb__footer-below{
            flex-direction: column;
            justify-content: left;
        }

        .sb__footer-below-links{
            flex-direction: column;
        }

        .sb__footer-below-links p{
            margin-left: 0rem;
            margin-top: 1rem;
        }
   }

   @media screen and (max-width: 400px) {
        .sb__footer-heading h1{
            font-size: 27px;
            line-height: 38px;
        }
   }
`

const DoctorInfoContainer = styled.div`
    display: flex; /* Alinea la imagen y la información en fila */
    align-items: center; /* Centra verticalmente */
`;

const ProfileImage = styled.div`
    width: 50px; /* Ajusta al tamaño deseado */
    height: 50px; /* Ajusta al tamaño deseado */
    border-radius: 50%; /* Hace que la imagen sea circular */
    overflow: hidden; /* Recorta cualquier desbordamiento */
    margin-right: 10px; /* Espacio entre la imagen y la información */

    img {
        width: 100%; /* Asegura que la imagen ocupe el contenedor */
        height: auto; /* Mantiene la proporción de la imagen */
    }
`;

const SocialIcon = styled.div`
    width: 50px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d3d8de;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    img {
        width: 80%;
        height: auto;
    }
`

const SocialLink = styled.a`
    display: flex; /* Asegúrate de que los iconos se alineen correctamente */
    width: 37px;   /* Ajusta al tamaño deseado */
    height: 40px;  /* Ajusta al tamaño deseado */
    margin: 0;     /* Evita márgenes adicionales */
    padding: 0;    /* Evita padding adicional */
    cursor: pointer; /* Muestra el cursor como puntero */

    /* Si quieres que el hover cambie el color del fondo o algo más */
    &:hover {
        background-color: #d3d8de; /* Cambia el fondo al pasar el cursor */
    }
`