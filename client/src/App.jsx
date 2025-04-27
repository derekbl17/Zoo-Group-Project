import { useState, useEffect, useMemo } from "react";
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
  const [sortOrder, setSortOrder] = useState("desc");

  const refreshData = () => {
    axios
      .get("http://localhost:5000/getAnimals")
      .then((res) => setData(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const filteredData = useMemo(() => {
    return data
      .filter((a) =>
        habitatFilter === ""
          ? true
          : a.aplinka.toLowerCase() === habitatFilter.toLowerCase()
      )
      .filter((a) =>
        a.gyvūnoPav.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((a) =>
        speciesFilter === ""
          ? true
          : a.rūšis.toLowerCase() === speciesFilter.toLowerCase()
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
  }, [data, habitatFilter, searchTerm, speciesFilter, sortField, sortOrder]);

  return (
    <>
      <Header />
      <Create refreshData={refreshData} />
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
          onChange={(e) => setHabitatFilter(e.target.value)}
        >
          <option value="">All habitats</option>
          <option value="air">Air</option>
          <option value="ground">Ground</option>
          <option value="water">Water</option>
          <option value="underground">Underground</option>
        </select>

        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
        >
          <option value="">All types</option>
          <option value="mammal">Mammal</option>
          <option value="insect">Insect</option>
          <option value="reptile">Reptile</option>
          <option value="avian">Avian</option>
        </select>

        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="">Sort by...</option>
          <option value="gyvūnoPav">Name</option>
          <option value="rūšis">Type</option>
          <option value="svoris">Weight</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">A-Z / Asc. order</option>
          <option value="desc">Z-A / Desc. order</option>
        </select>
      </div>
      <Card data={filteredData} refreshData={refreshData} />
      <Footer />
    </>
  );
}

export default App;
