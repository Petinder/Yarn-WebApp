import React from 'react';
import FilterForm from "../forms/FilterForm";
import Table from "../forms/Table";
import firebase from 'firebase';
import 'firebase/database';

import * as _ from 'lodash';

class FilterPage extends React.Component {
    submit = data => 
        this.props.login(data).then(() => this.props.history.push("/"));

    
    onChange(e){
        console.log("Cambio sexo desde page ..");
        console.log(e.target.sexo);
    }

    constructor (){
        super();
        this.state = {
            pets: null,
            filterpets: null,

            raza: 'N',
            sexo: 'M',
            pedigree: 'N',
            castrado: 'N',

            activefilters: {}
        };
    }

    updateSearch(event) {
        this.setState({sexo: 'M'});
    }
    
    ngOnInit(){
        this.db.list('/userPets').subscribe(petslist => {
            console.log("DATOS");
            this.pets = petslist;
            console.log(this.pets);
            this.applyFilters();
        })
    }

    //applyFilters(raza, sexo, pedigree, castrado){
    applyFilters(){
        //this.filterpets = _.filter(this.pets, _.conforms(this.activefilters))
        /*if(raza!='N'){
            console.log("no es N")
        }else{
            console.log("Es N")
        }*/
    }

    filterExact(property, rule){
        console.log("Ya entro");
        this.activefilters[property] = val => val == rule;
        this.applyFilters();
    }

    filterBoolena(property, rule){
        if (!rule) this.removeFilter(property)
        else{
            this.activefilters[property] = val => val;
            this.applyFilters();
        }
    }

    removeFilter(property){
        delete this.activefilters[property];
        this[property]=null;
        this.applyFilters();
    }

    componentDidMount() {
        const rootRef = firebase.database().ref().child('userPets');
        const petRef = rootRef.child('1');
        //Especifico valor
        /*const due = petRef.child('ownerInfo/name');

        due.on('value', snap => {
            this.setState({
                pets:snap.val()
            });
        });*/
        //todos los animales de la base de datos

        const table = document.querySelector("#petTable");

        rootRef.orderByChild("petInfo/petSpecies").startAt("P").on('child_added', snapshot => {
        //rootRef.orderByChild("petInfo/petSex").startAt(this.state.sexo).on('child_added', snapshot => {
        //rootRef.on('child_added', snapshot => {
            if(snapshot.child('petInfo/petSex').val() == 'M'){
                table.innerHTML += "<tr class='single line'><td class='single line'><div class='ui star rating' role='radiogroup'>"+
                            "<i aria-checked='false' aria-posinset='1' aria-setsize='3' class='active icon' tabindex='0' role='radio' /></div>" +
                            "</td><td class='single line'>" + snapshot.child('petInfo/petName').val() + 
                            "<td class='single line'>" + snapshot.child('petInfo/petSex').val() +
                            "</td><td class='single line'>" + snapshot.child('petInfo/petBreed').val() +
                            "</td><td class='single line'>" + snapshot.child('petInfo/petSpecies').val() +"</td></td></tr>"
            }
        });
        //this.applyFilters(this.state.raza, this.state.sexo, this.state.pedigree, this.state.castrado)
    }

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
            <h1>{this.state.sexo}</h1>
           </div>
        );
    }
}

export default FilterPage;