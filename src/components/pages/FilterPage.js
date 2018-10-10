import React from 'react';
import FilterForm from "../forms/FilterForm";
import 'firebase/database';

class FilterPage extends React.Component {
    submit = data => 
        this.props.login(data).then(() => this.props.history.push("/"));

    render(){
        return(
           <div>
            <FilterForm submit={this.submit} />
           </div>
        );
    }
}

export default FilterPage;