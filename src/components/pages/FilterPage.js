import React from 'react';
import FilterForm from "../forms/FilterForm";

class FilterPage extends React.Component {
    submit = data => 
        this.props.login(data).then(() => this.props.history.push("/"));

    render(){
        return(
           <div>
            <h1>Filtros</h1>
            <FilterForm submit={this.submit} />
           </div> 
        );
    }
}

export default FilterPage;