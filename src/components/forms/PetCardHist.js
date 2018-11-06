import React, {Component} from 'react';
import { Table } from 'semantic-ui-react';
import 'firebase/database';

class PetCardHist extends Component {
    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        return(
            <Table.Row>
                <Table.Cell textAlign='center'><i aria-hidden='true'><div class='ui blue label'><i class='file outline icon'></i> <a target='_blank' rel='noopener noreferrer' href={this.props.vaccination.Photo}>Comprobante</a></div></i></Table.Cell>
                <Table.Cell textAlign='center'>{this.props.vaccination.Name}</Table.Cell>
                <Table.Cell textAlign='center'>{this.props.vaccination.Vet}</Table.Cell>
                <Table.Cell textAlign='center'>{this.props.vaccination.Date}</Table.Cell>
            </Table.Row>
        )
    }
}

export default PetCardHist;