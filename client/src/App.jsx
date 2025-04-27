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

  const refreshData = () => {
    axios.get("http://localhost:5000/getAnimals")
      .then(res => setData(res.data))
      .catch(console.error);
  };
  useEffect(refreshData, []);

  const filteredData = data
    .filter(a => !habitatFilter || a.aplinka === habitatFilter)
    .filter(a => a.gyvūnoPav.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <Header />

      <Create refreshData={refreshData} />

      <div className="controls" style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        margin: "1rem 0"
      }}>
        <select
          value={habitatFilter}
          onChange={e => setHabitatFilter(e.target.value)}
        >
          <option value="">Visi</option>
          <option value="oras">Oras</option>
          <option value="žemė">Žemė</option>
          <option value="vanduo">Vanduo</option>
          <option value="po žeme">Po žeme</option>
        </select>

        <input
          type="text"
          placeholder="Search by name…"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <Card data={filteredData} refreshData={refreshData} />

      <Footer />
    </>
  );
}

export default App;