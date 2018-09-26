import React from 'react';
import { Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import PetProfilePage from "./components/pages/PetProfilePage";
import FilterPage from "./components/pages/FilterPage";
import VetPage from "./components/pages/VetPage";

const App = () => 
<div className="ui container">
  <Route path="/" exact component={LoginPage} />
  //<Route path="/login" exact component={LoginPage} />
  //<Route path="/profile" exact component={PetProfilePage} />
  //<Route path="/filter" exact component={FilterPage} />
  //<Route path="/Vet" exact component={VetPage} />
</div>; 


export default App;
