import React from 'react';
import { Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import PetProfilePage from "./components/pages/PetProfilePage";

const App = () => 
<div className="ui container">
  <Route path="/" exact component={HomePage} />
  <Route path="/login" exact component={LoginPage} />
  <Route path="/profile" exact component={PetProfilePage} />
</div>; 


export default App;
