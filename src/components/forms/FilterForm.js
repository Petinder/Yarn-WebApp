import React from 'react';
import { Form, Button, FormField, Message, Radio, FormRadio, FormInput } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import propTypes from 'prop-types';

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
    handleChange = (e, { value }) => this.setState({ value })

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Select fluid label='Raza' options={OpcionesRaza} placeholder='Raza' />
                <button class="negative ui button">Eliminar filtro</button>
                <br/><br/>
                <Form.Select fluid label='Sexo' options={OpcionesSexo} placeholder='Sexo' />
                <button class="negative ui button">Eliminar filtro</button>
                <br/><br/>
                <Form.Group inline>
                    <label>Otras opciones:</label>
                    <FormInput label='Pedigree' name="pedigree" tabindex="0" class="hidden" type={RadioExampleToggle}/>
                    <FormInput label='Castrado' name="castrado" tabindex="0" class="hidden" type={RadioExampleToggle}/>
                </Form.Group>
            </Form>
        );
    }
}
export default FilterForm;