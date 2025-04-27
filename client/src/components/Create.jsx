import React, { useState } from 'react'
import axios from "axios";

const Create = ({ refreshData }) => {
  const [values, setValues] = useState({
    gyvūnoPav: "",
    rūšis: "",
    svoris: "",
    aplinka: "",            // dropdown aplinkos pasirinkimui
    gyvenaLietuvoje: false
  })

  function handleSubmit(e) {
    e.preventDefault();
    if (values.gyvūnoPav && values.rūšis && values.svoris && values.aplinka) {
      axios.post('http://localhost:5000/addAnimal', values)
        .then(() => {
          refreshData()
          alert("Animal added")
          setValues({
            gyvūnoPav: "",
            rūšis: "",
            svoris: "",
            aplinka: "",
            gyvenaLietuvoje: false
          })
        })
        .catch((error) => console.log(error))
    } else {
      alert("Please fill out all fields")
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
    <div className='addContainer'>
      <form onSubmit={handleSubmit}>
        <h2>Add animal</h2>

        <label>
          Name
          <input className='formInput' type="text" name="gyvūnoPav" value={values.gyvūnoPav} onChange={handleChange} />
        </label>

        <label>
          Type
          <input className='formInput' type="text" name="rūšis" value={values.rūšis} onChange={handleChange} />
        </label>

        <label>
          Weight
          <input className='formInput' type="number" name="svoris" step="any" value={values.svoris} onChange={handleChange} />
        </label>

        <label>
          Habitat
          <select
            className='formInput'
            name="aplinka"
            value={values.aplinka}
            onChange={handleChange}
            required
          >
            <option value="">- Pasirinkite aplinką -</option>
            <option value="oras">Oras</option>
            <option value="žemė">Žemė</option>
            <option value="vanduo">Vanduo</option>
            <option value="po žeme">Po žeme</option>
          </select>
        </label>

        <div className='checkBox-container'>
          <label>
            Lives in Lithuania
            <input className='formInput checkBox' type="checkbox" name="gyvenaLietuvoje" checked={values.gyvenaLietuvoje} onChange={handleChange} />
          </label>
        </div>

        <button className='submit' type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Create;