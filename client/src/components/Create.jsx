import React, { useState } from 'react'
import axios from "axios";


const Create = ({refreshData,data}) => {
    const [values, setValues]=useState({
        gyvūnoPav:"",
        rūšis:"",
        svoris:"",
        aplinka:"",
        gyvenaLietuvoje:""
    })
    //sukuria irasa
    function handleSubmit(e){
        e.preventDefault();
        if(values.gyvūnoPav && values.rūšis && values.svoris && values.aplinka){
            axios.post('http://localhost:5000/addAnimal', values).then((res)=>{
            refreshData()
            console.log(res)
            alert("animal added")
            }).catch((error)=>{console.log(error)})
        }else{
            alert("fill out all fields")
        }
        

    }
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues({
            ...values,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
  return (
    <div>
        <h3>Add animal</h3>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Gyvūno pavadinimas</label>
                <input type="text" name="gyvūnoPav" value={values.gyvūnoPav} onChange={handleChange}/>
            </div>
            <div>
                <label>Rūšis</label>
                <input type="text" name="rūšis" value={values.rūšis} onChange={handleChange}/>
            </div>
            <div>
                <label>Svoris</label>
                <input type="number" name="svoris" step="any" value={values.svoris} onChange={handleChange}/>
            </div>
            <div>
                <label>Aplinka(Habitat)</label>
                <input type="text" name="aplinka" value={values.aplinka} onChange={handleChange}/>
            </div>
            <div>
                <label>Gyvena Lietuvoje</label>
                <input type="checkbox" name="gyvenaLietuvoje" checked={values.gyvenaLietuvoje} onChange={handleChange}/>
            </div>
            <button type='submit'>submit</button>
        </form>
    </div>
  )
}

export default Create
