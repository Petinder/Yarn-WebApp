import React from 'react';
import { Form, Button, FormField, Message, Header, Radio } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import propTypes from 'prop-types';

class FilterForm extends React.Component {
    state = {
        data: {
            ownerName: '',
            ownerMail: '',
            ownerPhone: '',
            ownerAddress: '',
            petSpecies: '',
            petName: '',
            petBreed: '',
            petBirthDate: '',
            petSex: '',
            petPhoto: '',
            petPedigree: '',
            petAsexed: '',
            petHealth: ''
        },
        loading: false,
        errors: {}
    }
 
    onChange = e => 
    this.setState({ 
        data: { ...this.state.data, [e.target.name]: e.target.value } 
    })

    handleChange = (e, { value }) => this.setState({ value })

    handleDateChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
    }

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0){
            this.props
                .submit(this.state.data)
                .catch(err => this.setState({errors: err.response.data.errors}));
        }
    };

    validate = (data) => {
        const errors = {};
        if (Validator.isEmpty(data.ownerName)) errors.ownerName = "Debe ingresar un nombre";
        if (!Validator.isMobilePhone(data.ownerPhone)) errors.ownerPhone = "Número inválido";
        if (Validator.isEmpty(data.petName)) errors.petName = "Debe ingresar un nombre";
        return errors;
    };

    render() {
        const { data, errors } = this.state;
        const { value } = this.state
        return (
            <Form onSubmit={this.onSubmit}>
                {errors.global && <Message negative>
                    <Message.Header>Something went wrong!</Message.Header>
                    <p>{errors.global}</p>
                </Message>}
                <Header as='h3'>Datos mascota</Header>
                <FormField error={!!errors.petName}>
                    <label htmlFor="petName">Nombre</label>
                    <input 
                    type="text" 
                    id="petName" 
                    name="petName" 
                    placeholder="Nombre"
                    value={data.petName}
                    onChange={this.onChange}/>
                    {errors.petName && <InlineError text={errors.petName} />}
                </FormField>
                <FormField error={!!errors.ownerPhone}>
                    <label htmlFor="ownerPhone">Número de teléfono</label>
                    <input 
                    type="text" 
                    id="ownerPhone" 
                    name="ownerPhone" 
                    placeholder="Número de teléfono"
                    value={data.ownerPhone}
                    onChange={this.onChange}/>
                    {errors.ownerPhone && <InlineError text={errors.ownerPhone} />}
                </FormField>
                <Button primary>Registrar</Button>
            </Form>
        );
    }
}

FilterForm.propTypes = {
    submit: propTypes.func.isRequired
};

export default FilterForm;