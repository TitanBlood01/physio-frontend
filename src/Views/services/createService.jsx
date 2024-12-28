
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const ComingSoon = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Regresa a la página anterior
    };

    return (
        <Container>
            <Message>
                🚧 <strong>¡Muy pronto!</strong> 🚧
            </Message>
            <Description>
                Estamos trabajando en esta funcionalidad para ofrecerte la mejor experiencia. 
                Por favor, vuelve más tarde.
            </Description>
            <BackButton onClick={handleGoBack}>Volver atrás</BackButton>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    background-color: #f3f4f6;
    color: #333;
`;

const Message = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #ff6b6b;
`;

const Description = styled.p`
    font-size: 1.2rem;
    color: #555;
    max-width: 600px;
`;

const BackButton = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #28a745;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color:rgb(45, 194, 80);
    }
`;

export default ComingSoon;
