import React from 'react';
import ContactoForm from "../forms/ContactoForm";
import 'firebase/database';

class SoportePage extends React.Component {
    submit = data => 
        this.props.login(data).then(() => this.props.history.push("/"));

    render(){
        return(
           <div>
            <ContactoForm submit={this.submit} />
           </div>
        );
    }
}

export default SoportePage;