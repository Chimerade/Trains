import React, { useState } from 'react';
import JourneyTimes from './JourneyTimes';
import { Tab, Tabs } from 'react-bootstrap';
import './App.css';
import reverse_image from './reverse.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [selectedValue, setSelectedValue] = useState(20); // curseur
  const [direction, setDirection] = useState(true); // variable pour stocker l'état du bouton Swipe
  const [activeTab, setActiveTab] = useState('Templemars');


  return (
    <div style={{ zoom : '100%', overflowX : 'hidden', display: "flex", flexDirection: "column", width: '100%', maxWidth: '100%', margin: 'auto', paddingTop: '20px' }}>
      <div style={{ fontSize: "50px", fontWeight :"bolder", width: "300px", margin: "auto", marginTop: '10px' }}>OneClick-RT</div>
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
      <Tabs  variant="pills" activeKey={activeTab} onSelect={(key) => setActiveTab(key)}  style={{ margin: "auto", marginTop: '30px' }}>
        <Tab eventKey="Seclin" title="Seclin">
          {activeTab === 'Seclin' && (
            <>
             
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
        <img src={reverse_image} alt="Reverse button" onClick={() => setDirection(!direction)} style={{ maxWidth: '50px', maxHeight: '50px' }} />

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

