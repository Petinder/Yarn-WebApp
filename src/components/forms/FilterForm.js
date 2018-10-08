import React from 'react';
import { Form, Button, FormField, Radio, FormRadio, FormInput } from 'semantic-ui-react';

import Page from '../pages/FilterPage';

const RadioExampleToggle = () => <Radio toggle />

const OpcionesRaza = [
    { key: 'c', text: 'Gato', value: 'gato' },
    { key: 'd', text: 'Perro', value: 'perro' },
]

const OpcionesSexo = [
    { key: 'f', text: 'Hembra', value: 'hembra' },
    { key: 'm', text: 'Macho', value: 'macho' },
]

class FilterForm extends React.Component {
    constructor() {
        super();
        this.state = {
            valor: "",
            radio: "",
            sexo: "",
            raza: "",
            pedigree: false,
            castrado: false
        };
    
        this.handleChangeR = this.handleChangeR.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleChangeR = (e, { value }) => {
        this.setState({ raza: value })
        console.log(this.state.raza);
    }
    handleChangeS = (e, { value }) => {
        this.setState({ sexo: value })
        console.log(value);
    }
    changeRadio = e => {
        this.setState({ [e.target.name]: e.target.checked });
        console.log("Valor ", e.target.checked, "nombre ", e.target.name)
    }
    
    onChange(){
        console.log("No sale");
    }
    change = e => {
        console.log("Porfa");
        const {name, value} = e.target;
        console.log(value);
        this.setState({[name]: value});
    }

    render() {
        const {valor, radio, sexo, raza, pedigree, castrado} = this.state
        return (
            <Form>
                <Form.Select
                    fluid
                    selection
                    label='Raza'
                    options={OpcionesRaza}
                    value={raza}
                    placeholder='Raza'
                    onChange={this.handleChangeR}
                />
                <button class="negative ui button" >Eliminar filtro</button>
                <br/><br/>
                <Form.Select
                    fluid
                    selection
                    label='Sexo'
                    options={OpcionesSexo}
                    value={sexo}
                    placeholder='Sexo'
                    onChange={this.handleChangeS}
                />
                <button class="negative ui button">Eliminar filtro</button>
                <br/><br/>
                <Form.Group inline>
                    <label>Otras opciones:</label>
                    <FormInput
                        label='Pedigree' 
                        name="pedigree" 
                        type='checkbox' 
                        checked={pedigree}
                        onChange={this.changeRadio}
                    />
                    <FormInput 
                        label='Castrado' 
                        name="castrado" 
                        type='checkbox' 
                        checked={castrado} 
                        onChange={this.changeRadio}
                    />

                    <Form.Input
                        name = "valor"
                        onChange={this.change}
                        value={valor}
                        placeholder = "Valor"
                        fluid
                    />
                </Form.Group>
                <h1>AQUI</h1>
            </Form>
        );
    }
}
export default FilterForm;