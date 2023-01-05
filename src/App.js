import React , { useState } from 'react';
import JourneyTimes from './JourneyTimes';

function App() {
  const [selectedValue, setSelectedValue] = useState(60); // curseur

  return (
   
  <div style={{ display: "flex", flexDirection: "column" ,width: '100%', maxWidth: '100%', margin: 'auto',paddingTop : '20px'}}>
       
  {/* Display the slider */}
  <input
    type="range"
    min={10}
    max={60}
    value={selectedValue}
    step="5"
    onChange={(event) => {
      setSelectedValue(event.target.value);
    }}
    style={{ height: "5px", width: "150px", margin: "auto",marginTop : '20px' }}
  />
  {/* Display the selected value */}
  <p style={{ fontSize: "12px", margin: "auto", justifyContent: "center",paddingTop : '10px' }}>
    Temps Max: {selectedValue}
  </p>
    <p style={{ fontSize: "15px", margin: "auto", fontWeight: 'bold',justifyContent: "center",marginTop : '30px',marginBottom : '-10px' }}>Vers Lille de Templemars
        <JourneyTimes startstation='stop_area:SNCF:87286526' arrivalstation='stop_area:SNCF:87286005' cursorvalue = {selectedValue}/>
   </p>


   <p style={{ fontSize: "15px", margin: "auto", fontWeight: 'bold',justifyContent: "center",paddingTop : '80px',marginBottom : '-40px' }}>De Lille Vers Templemars
   <p>

        <JourneyTimes startstation='stop_area:SNCF:87286005' arrivalstation='stop_area:SNCF:87286526' cursorvalue = {selectedValue}/></p>
   </p>


   <div  style ={{display: "flex", flexDirection: "column", margin: 'auto',marginTop : '100px' }} >
      <button onClick={() => window.location.reload()}
            style={{width: '80px',height : '50px',borderRadius :'2px'}} >Refresh</button> 
      </div>
   </div>

  );
}

export default App;