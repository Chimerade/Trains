import React, { useState } from 'react';
import JourneyTimes from './JourneyTimes';
import { Tab, Tabs } from 'react-bootstrap';
import './App.css';
import reverse_image from './reverse.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [selectedValue, setSelectedValue] = useState(20); // curseur
  const [direction, setDirection] = useState(true); // variable pour stocker l'état du bouton Swipe
  const [activeTab, setActiveTab] = useState('Seclin');


  return (
    <div style={{ display: "flex", flexDirection: "column", width: '100%', maxWidth: '100%', margin: 'auto', paddingTop: '20px' }}>
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
        style={{ height: "15px", width: "200px", margin: "auto", marginTop: '30px' }}
      />
      {/* Display the selected value */}
      <p style={{ fontSize: "12px", margin: "auto", justifyContent: "center", paddingTop: '10px' }}>
        Temps Max: {selectedValue}
      </p>
      <Tabs variant="pills" activeKey={activeTab} onSelect={(key) => setActiveTab(key)}  style={{ margin: "auto", marginTop: '30px' }}>
        <Tab eventKey="Seclin" title="Seclin">
          {activeTab === 'Seclin' && (
            <>
              <p style={{ marginLeft : '30%',fontWeight: 'bold', paddingTop: '25px', marginBottom: '-20px' }}>{direction ? "Vers Lille Flandres de Seclin" : "Vers Seclin de Lille Flandres"}</p>
              {direction ?
                <JourneyTimes startstation='stop_area:SNCF:87286518' arrivalstation='stop_area:SNCF:87286005' cursorvalue={selectedValue} /> :
                <JourneyTimes startstation='stop_area:SNCF:87286005' arrivalstation='stop_area:SNCF:87286518' cursorvalue={selectedValue} />
              }
            </>
          )}
        </Tab>
        <Tab eventKey="Templemars" title="Templemars">
          {activeTab === 'Templemars' && (
            <>
              <p style={{ marginLeft : '30%',fontWeight: 'bold', textAlign: 'left', paddingTop: '25px', marginBottom: '-20px' }}>{direction ? "Vers Lille Flandres de Templemars" : "Vers Templemars de Lille Flandres"}</p>
              {direction ?
                <JourneyTimes startstation='stop_area:SNCF:87286526' arrivalstation='stop_area:SNCF:87286005' cursorvalue={selectedValue} /> :
                <JourneyTimes startstation='stop_area:SNCF:87286005' arrivalstation='stop_area:SNCF:87286526' cursorvalue={selectedValue} />
              }
            </>
          )}
        </Tab>
        <Tab eventKey="Lesquin" title="Lesquin">
          {activeTab === 'Lesquin' && (
            <>
              <p style={{ fontWeight: 'bold', marginLeft : '30%',  paddingTop: '25px', marginBottom: '-20px' }}>{direction ? "Vers Lille Flandres de Lesquin" : "Vers Lesquin de Lille Flandres"}</p>
              {direction ?
                <JourneyTimes startstation='stop_area:SNCF:87286849' arrivalstation='stop_area:SNCF:87286005' cursorvalue={selectedValue} /> :
                <JourneyTimes startstation='stop_area:SNCF:87286005' arrivalstation='stop_area:SNCF:87286849' cursorvalue={selectedValue} />
              }
            </>
          )}
        </Tab>
      </Tabs>


      <div style={{ display: "flex", flexDirection: "row", margin: 'auto', marginTop: '50px' }} >
        {/* Bouton Swipe */}
        <img src={reverse_image} alt="Reverse button" onClick={() => setDirection(!direction)} style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '20px' }} />

        {/* 
        <div style={{ display: "flex", flexDirection: "row" }} >
        <img src={refresh_image} alt="Refresh button" onClick={JourneyTimes.refreshData} style={{ maxWidth: '50px', maxHeight: '50px'}} />
        </div>
        */}




      </div>
    </div>
  );
}

export default App;

