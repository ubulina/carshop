import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';

export default function Carlist(){

    const [cars, setCars] = useState ([]);

    useEffect( () => {

        fetchData()

    }, []);

    const fetchData = () => {

        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    }

    const deleteCar = (link) => {
        if(window.confirm('Are you sure?')){
            console.log(link);
            fetch(link, {method: 'DELETE'})
            .then(response => fetchData())
            .catch(err => console.error(err));
        }    

    }

    const columns = [

        {
            Header: 'Brand',
            accessor: 'brand'
        },

        {
            Header: 'Model',
            accessor: 'model'
        },

        {
            Header: 'Color',
            accessor: 'color'
        },

        {
            Header: 'Fuel',
            accessor: 'fuel'
        },

        {
            Header: 'Year',
            accessor: 'year'
        },

        {
            Header: 'Price',
            accessor: 'price'
        },

        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: row => <Button size= "small" color = "secondary" onClick={() => deleteCar(row.value)}>Delete</Button>
        }

        
    ]

    return (

        <div>

        <ReactTable data={cars} columns={columns} filterable={true}/>

        </div>
    );
}