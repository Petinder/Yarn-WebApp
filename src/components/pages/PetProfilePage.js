import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PetProfileForm from "../forms/PetProfileForm";
import { login } from "../../actions/auth";

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

export default connect(null, {login})(PetProfilePage);