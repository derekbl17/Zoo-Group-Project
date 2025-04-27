import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AnimalList() {
  const [animals, setAnimals] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('');
  const [sortField, setSortField] = useState('name'); // 'name' | 'species' | 'weight'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

  useEffect(() => {
    axios.get('http://localhost:5000/getAnimals')
      .then(res => setAnimals(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredAndSorted = () => {
    return animals
      .filter(a => a.gyvūnoPav.toLowerCase().includes(filterName.toLowerCase()))
      .filter(a => a.rūšis.toLowerCase().includes(filterSpecies.toLowerCase()))
      .sort((a, b) => {
        let aVal, bVal;
        switch (sortField) {
          case 'name':
            aVal = a.gyvūnoPav.toLowerCase();
            bVal = b.gyvūnoPav.toLowerCase();
            break;
          case 'species':
            aVal = a.rūšis.toLowerCase();
            bVal = b.rūšis.toLowerCase();
            break;
          case 'weight':
            aVal = parseFloat(a.svoris);
            bVal = parseFloat(b.svoris);
            break;
          default:
            return 0;
        }
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        return 0;
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gyvūnų sąrašas</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Filtruoti pagal pavadinimą"
          className="border p-2 rounded"
          value={filterName}
          onChange={e => setFilterName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtruoti pagal rūšį"
          className="border p-2 rounded"
          value={filterSpecies}
          onChange={e => setFilterSpecies(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={sortField}
          onChange={e => setSortField(e.target.value)}
        >
          <option value="name">Pavadinimas</option>
          <option value="species">Rūšis</option>
          <option value="weight">Svoris</option>
        </select>
        <select
          className="border p-2 rounded"
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
        >
          <option value="asc">A-Z / mažėjimo</option>
          <option value="desc">Z-A / didėjimo</option>
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Pavadinimas</th>
            <th className="border p-2">Rūšis</th>
            <th className="border p-2">Svoris</th>
            <th className="border p-2">Aplinka</th>
            <th className="border p-2">Gyvena Lietuvoje</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSorted().map(animal => (
            <tr key={animal.id}>
              <td className="border p-2">{animal.gyvūnoPav}</td>
              <td className="border p-2">{animal.rūšis}</td>
              <td className="border p-2">{animal.svoris}</td>
              <td className="border p-2">{animal.aplinka}</td>
              <td className="border p-2">{animal.gyvenaLietuvoje ? 'Taip' : 'Ne'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
