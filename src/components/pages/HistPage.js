import React from 'react';
import HistForm from "../forms/HistForm";

class HistPage extends React.Component {
    submit = data => 
        this.props.login(data).then(() => this.props.history.push("/"));

    render(){
        return(
           <div>
            <HistForm submit={this.submit} />
           </div> 
        );
    }
}

export default HistPage;