import React, { useEffect, useState } from 'react';
import Update from './Update';
import Delete from './Delete';

const Get = ({refreshData,data}) => {
  const [id,setId]=useState(null)

  return (
    <div>
      <h3>Animals List</h3>
      <div>
        {/* Animals card map */}
        <h1>Update Animal</h1>
        <select name="" id="" onChange={(e)=>setId(e.target.value)}>
          <option value="">Select animal id</option>
          {data?.map((animal)=><option key={animal.id} value={animal.id}>{animal.name || animal.id}</option>)}
        </select>
        {id ? <Update id={id} onUpdate={refreshData}/> : <h2>Select id to update</h2>}
        <h1>Delete animals</h1>
        {data?.map((animal)=><Delete key={animal.id} id={animal.id} onDelete={refreshData} setId={setId} selectedId={id}/>)}
      </div>
    </div>
  );
};

export default Get;
