import React from 'react';
import { Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import PetProfilePage from "./components/pages/PetProfilePage";
import FilterPage from "./components/pages/FilterPage";

const App = () => 
<div className="ui container">
  <Route path="/" exact component={HomePage} />
  <Route path="/login" exact component={LoginPage} />
  <Route path="/profile" exact component={PetProfilePage} />
  <Route path="/filter" exact component={FilterPage} />
</div>; 


export default App;
