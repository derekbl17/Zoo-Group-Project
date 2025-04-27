import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Create from "./components/Create";
import Card from "./components/Card";

function App() {
  const [data, setData] = useState([]);
  const [habitatFilter, setHabitatFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const refreshData = () => {
    axios.get("http://localhost:5000/getAnimals")
      .then(res => setData(res.data))
      .catch(console.error);
  };


  useEffect(() => {
    refreshData();
  }, []);

  const filteredData = data
    .filter((a) =>
      habitatFilter === "" ? true : a.aplinka.toLowerCase() === habitatFilter.toLowerCase()
    )
    .filter((a) =>
      a.gyvūnoPav.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((a) =>
      speciesFilter === "" ? true : a.rūšis.toLowerCase() === speciesFilter.toLowerCase()
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      let aField = a[sortField];
      let bField = b[sortField];
      if (typeof aField === "string") {
        aField = aField.toLowerCase();
        bField = bField.toLowerCase();
      }
      if (sortOrder === "asc") {
        return aField > bField ? 1 : -1;
      } else {
        return aField < bField ? 1 : -1;
      }
    });

  return (
    <>
      <header/>
      <Create refreshData={refreshData} />

      {/* Filtrai ir paieška */}
      <div
        className="controls"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          margin: "1rem 0",
        }}
      >
        <select
          value={habitatFilter}
          onChange={e => setHabitatFilter(e.target.value)}
        >
          <option value="">Visos aplinkos</option>
          <option value="oras">Oras</option>
          <option value="žemė">Žemė</option>
          <option value="vanduo">Vanduo</option>
          <option value="po žeme">Po žeme</option>
        </select>

        <input
          type="text"
          placeholder="Ieškoti pagal vardą..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        {/* Rūšis */}
        <select
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
        >
          <option value="">Visos rūšys</option>
          <option value="žinduolis">Žinduolis</option>
          <option value="vabzdys">Vabzdys</option>
          <option value="roplys">Roplys</option>
          <option value="paukštis">Paukštis</option>
        </select>

        {/* Rikiavimas pagal lauką */}
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="">Nerūšiuoti</option>
          <option value="gyvūnoPav">Pavadinimas</option>
          <option value="rūšis">Rūšis</option>
          <option value="svoris">Svoris</option>
        </select>

        {/* Rikiavimo tvarka */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">A-Z / Mažėjimo tvarka</option>
          <option value="desc">Z-A / Didėjimo tvarka</option>
        </select>
      </div>

      <Card data={filteredData} refreshData={refreshData} />

      <Footer />
    </>
  );
}

export default App;