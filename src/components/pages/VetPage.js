import React from 'react';
import VetForm from "../forms/VetForm";

class VetPage extends React.Component {
    submit = data => 
        this.props.login(data).then(() => this.props.history.push("/"));

    render(){
        return(
           <div>
            <h1>Veterinarios!</h1>
            <VetForm submit={this.submit} />
           </div> 
        );
    }
}

export default VetPage;