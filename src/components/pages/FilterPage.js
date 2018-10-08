import React from 'react';
import FilterForm from "../forms/FilterForm";
import Table from "../forms/Table";
import 'firebase/database';

class FilterPage extends React.Component {
    submit = data => 
        this.props.login(data).then(() => this.props.history.push("/"));

    render(){
        return(
           <div>
            <h1>Filtros</h1>
            <FilterForm submit={this.submit} />
            <Table
                header={[
                {name:'Rating'},
                {name:'Nombre'},
                {name:'Sexo'},
                {name:'Raza'},
                {name:'Especie'}]}/>
           </div>
        );
    }
}

export default FilterPage;