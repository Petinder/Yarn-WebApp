import React from 'react';
import { Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import PetProfilePage from "./components/pages/PetProfilePage";
import FilterPage from "./components/pages/FilterPage";
<<<<<<< HEAD
import VetPage from "./components/pages/VetPage";
=======
import vetsProfilePage from "./components/pages/vetsProfilePage";
>>>>>>> 98af000a0f2d37f5a472bcf66b3b00227e57a00d

const App = () => 
<div className="ui container">
  <Route path="/" exact component={HomePage} />
  <Route path="/login" exact component={LoginPage} />
  <Route path="/profile" exact component={PetProfilePage} />
  <Route path="/filter" exact component={FilterPage} />
<<<<<<< HEAD
  <Route path="/Vet" exact component={VetPage} />
=======
  <Route path="/vetsProfile" exact component={vetsProfilePage} />
>>>>>>> 98af000a0f2d37f5a472bcf66b3b00227e57a00d
</div>; 


export default App;
