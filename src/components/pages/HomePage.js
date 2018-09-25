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
<<<<<<< HEAD
        <Link to="/Vet">Veterinarios</Link>
=======
        <Link to="/vetsProfile">Perfil Veterinario</Link>
        <br></br>
>>>>>>> 98af000a0f2d37f5a472bcf66b3b00227e57a00d
    </div>
)

export default HomePage;