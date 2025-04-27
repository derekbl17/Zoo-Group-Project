import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Update = ({ onUpdate, initialData, onClose }) => {
  const [animalData, setAnimalData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/updateAnimal/${initialData.id}`, animalData)
      .then(() => {
        onUpdate();
        Swal.fire(
          `Successfully edited ${initialData.gyvūnoPav}!`,
          "",
          "success"
        );
        onClose();
      })
      .catch((error) => {
        console.error("Error updating animal:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAnimalData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="update-form">
      <h2>Edit Animal</h2>
      <div className="row">
        <label>Name:</label>
        <input
          type="text"
          name="gyvūnoPav"
          value={animalData.gyvūnoPav}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        <label>Type:</label>
        <input
          type="text"
          name="rūšis"
          value={animalData.rūšis}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        <label>Weight:</label>
        <input
          type="number"
          name="svoris"
          value={animalData.svoris}
          onChange={handleChange}
          required
          step="any"
        />
      </div>

      <div className="row">
        <label>Habitat:</label>
        <select
          name="aplinka"
          value={animalData.aplinka}
          onChange={handleChange}
          required
        >
          <option value="">-- Pasirinkite aplinką --</option>
          <option value="oras">Oras</option>
          <option value="žemė">Žemė</option>
          <option value="vanduo">Vanduo</option>
          <option value="po žeme">Po žeme</option>
        </select>
      </div>

      <div className="row">
        <label>Lives in Lithuania:</label>
        <input
          type="checkbox"
          name="gyvenaLietuvoje"
          checked={animalData.gyvenaLietuvoje}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Update;
