import React from 'react';
import PropTypes from 'prop-types';
import PetProfileForm from "../forms/PetProfileForm";

class PetProfilePage extends React.Component {

    render(){
        return(
           <div>
            <h1>Pet Profile Page!</h1>
            <PetProfileForm />
           </div> 
        );
    }
}


export default PetProfilePage;