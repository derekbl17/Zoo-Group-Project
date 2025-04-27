import { useState, useEffect } from "react";
import axios from "axios";
import Create from "./components/Create";
import Card from "./components/Card";

function App() {
  const [data, setData] = useState([]);
  const [habitatFilter, setHabitatFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const refreshData = () => {
    axios
      .get("http://localhost:5000/getAnimals")
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    refreshData();
  }, []);

  // Filtruojame pagal dropdown ir search bar
  const filteredData = data
    .filter((a) =>
      habitatFilter === "" ? true : a.aplinka.toLowerCase() === habitatFilter.toLowerCase()
    )
    .filter((a) =>
      a.gyvūnoPav.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <header>
        <h1>Zoo Crud</h1>
      </header>

      <Create refreshData={refreshData} />

      {/*filtras ir paieska */}
      <div
        className="controls"
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          margin: "1rem 0",
        }}
      >
        <select
          value={habitatFilter}
          onChange={(e) => setHabitatFilter(e.target.value)}
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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="cardContainer">
        <Card data={filteredData} refreshData={refreshData} />
      </div>
    </>
  );
}

export default App;
