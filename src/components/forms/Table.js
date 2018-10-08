import React from 'react';
import { Form, FormInput, Header, Table, Rating } from 'semantic-ui-react';

/*
const row = (i, data) =>
<tr class='single line'>
{
    data.map((y) =>
    <td class='single line' key={i}>{y.name[i]}
    <h3>{y.name}</h3>
    </td>
)}
</tr>;*/

//export default({data, header}) =>
export default({header}) =>

    <Table class='ui celled padded table'>
        <thead class=''>
            <tr class='single line'>
                {header.map((x,i) =>
                    <th class='' key={i}>{x.name}</th>
                )}            
            </tr>
        </thead>
        <tbody class='' id ='petTable'>
            {/*<tr class=''>
            <td class='' id = 'rating'>
                <div class='ui star rating' role='radiogroup'>
                <i
                    aria-checked='false'
                    aria-posinset='1'
                    aria-setsize='3'
                    class='active icon'
                    tabindex='0'
                    role='radio'
                />
                <i
                    aria-checked='false'
                    aria-posinset='2'
                    aria-setsize='3'
                    class='active icon'
                    tabindex='0'
                    role='radio'
                />
                <i
                    aria-checked='true'
                    aria-posinset='3'
                    aria-setsize='3'
                    class='active icon'
                    tabindex='0'
                    role='radio'
                />
                </div>
            </td>
            <td class='' id='Sexo'>
                <h2 class='ui center aligned header'>A</h2>
            </td>
            <td class='single line' id = 'Nombre'>Power Output</td>
            <td class='right aligned' id='Raza'>
                80% <br />
                <a href='#'>18 studies</a>
            </td>
            <td class='' id='Especie'>
                Creatine supplementation is the reference compound for increasing muscular creatine levels;
                there is variability in this increase, however, with some nonresponders.
            </td>
            </tr>*/}
            
            {/*row(0, data)*/}
            {/*row(1, data)*/}
            


        
            {/*<tr class=''>
            <td class='' id = 'rating'>
                <div class='ui star rating' role='radiogroup'>
                <i
                    aria-checked='false'
                    aria-posinset='1'
                    aria-setsize='3'
                    class='active icon'
                    tabindex='0'
                    role='radio'
                />
                <i
                    aria-checked='false'
                    aria-posinset='2'
                    aria-setsize='3'
                    class='active icon'
                    tabindex='0'
                    role='radio'
                />
                <i
                    aria-checked='true'
                    aria-posinset='3'
                    aria-setsize='3'
                    class='active icon'
                    tabindex='0'
                    role='radio'
                />
                </div>
            </td>
            {data.map((x,i) =>
                <td class='single line' key={i}>{x.name}
                <h1>{x.name.length}</h1></td>
            )}
        </tr>*/}
        </tbody>
    </Table>
