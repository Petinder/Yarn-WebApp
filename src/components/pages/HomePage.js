import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
    <div>
        <h1>Home Page!</h1>
        <Link to="/login">Login</Link>
        <br></br>
        <Link to="/profile">Perfil Mascota</Link>
        <br></br>
        <Link to="/filter">Filtros</Link>
        <br></br>
        <Link to="/Vet">Veterinarios</Link>
    </div>
)

export default HomePage;