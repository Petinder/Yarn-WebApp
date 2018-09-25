import React from 'react';
import vetsProfileForm from "../forms/vetsProfileForm";

class vetsProfilePage extends React.Component {
    submit = data => 
        this.props.login(data).then(() => this.props.history.push("/"));

    render(){
        return(
           <div>
            <h1>Vets Profile Page!</h1>
            <vetsProfileForm submit={this.submit} />
           </div> 
        );
    }
}

export default vetsProfilePage;