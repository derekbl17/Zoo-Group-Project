import React, { useState } from 'react';
import axios from 'axios';

const Delete = ({id, onDelete, setId, selectedId}) => {
    const [message, setMessage] = useState('');


//istrina irasa pagal id
    const handleDelete = () => {
      axios
        .delete(`http://localhost:5000/deleteAnimal/${id}`)
        .then((res) => {
          onDelete();
          if(id==selectedId)setId(null)
          setMessage(res.data.message);
        })
        .catch((error) => {
          setMessage(error.response ? error.response.data.message : 'Error deleting animal');
        });
    };
  
    return (
      <div>
        <button onClick={handleDelete}>Delete {id}</button>
        <p>{message}</p>
      </div>
    );
  };

export default Delete
