import React from 'react';
import PropTypes from 'prop-types';
import PetProfileForm from "../forms/PetProfileForm";

class PetProfilePage extends React.Component {
    submit = data => 
        this.props.login(data).then(() => this.props.history.push("/"));

    render(){
        return(
           <div>
            <h1>Pet Profile Page!</h1>
            <PetProfileForm submit={this.submit} />
           </div> 
        );
    }
}

PetProfilePage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
}

export default PetProfilePage;