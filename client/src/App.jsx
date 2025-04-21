import { useState, useEffect } from "react";
import axios from "axios";
import Get from "./components/Get"
import Create from "./components/Create"


function App() {
  const [data, setData] = useState([]);
  const refreshData=()=>{
    axios
    .get('http://localhost:5000/getAnimals')
    .then((res) => setData(res.data))
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    console.log("initialized log from get")
    refreshData()
  }, []);
 

  return (
    <>
     <Create refreshData={refreshData}/>
     <Get  refreshData={refreshData} data={data}/>
    </>
  )
}

export default App
