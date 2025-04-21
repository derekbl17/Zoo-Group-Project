import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Update = ({ id, onUpdate }) => {
  const [animalData, setAnimalData] = useState({
    gyvūnoPav: '',
    rūšis: '',
    svoris: '',
    aplinka: '',
    gyvenaLietuvoje: false,
  });
// get animal by id
  useEffect(() => {
    if (id){
      console.log(id, typeof id)
      axios
      .get(`http://localhost:5000/getAnimalById/${id}`)
      .then((res) => {
        setAnimalData(res.data);
        console.log(res.data)
      })
      .catch((error) => {
        console.error('Error fetching animal:', error);
      });
    }
  }, [id]);
  
  // preventinta onclick refresh ir updatina animal by name
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/updateAnimal/${id}`, animalData)
      .then((res) => {
        onUpdate()
        console.log('Animal updated successfully:', res.data);
      })
      .catch((error) => {
        console.error('Error updating animal:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAnimalData({
      ...animalData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Gyvūno pavadinimas:</label>
          <input type="text" name="gyvūnoPav" value={animalData.gyvūnoPav || ''} onChange={handleChange}/>
        </div>
        <div>
          <label>Rūšis:</label>
          <input type="text" name="rūšis" value={animalData.rūšis || ''} onChange={handleChange}/>
        </div>
        <div>
          <label>Svoris:</label>
          <input
            type="number" name="svoris" value={animalData.svoris || ''} onChange={handleChange}/>
        </div>
        <div>
          <label>Aplinka (Habitat):</label>
          <input
            type="text" name="aplinka" value={animalData.aplinka || ''} onChange={handleChange}/>
        </div>
        <div>
          <label>Gyvena Lietuvoje:</label>
          <input
            type="checkbox" name="gyvenaLietuvoje" checked={animalData.gyvenaLietuvoje} onChange={handleChange}/>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Update;