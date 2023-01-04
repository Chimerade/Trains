import React , { useState } from 'react';
import JourneyTimes from './JourneyTimes';

function createFormattedDate(dateString) {
  const year = dateString.substring(0,4);
  const month = dateString.substring(4,6);
  const day = dateString.substring(6,8);

  const hours = dateString.substring(9,11);
  const minutes = dateString.substring(11,13);
  const seconds = dateString.substring(13,15);

  return new Date(year, month, day, hours, minutes, seconds);
}

const JourneyTimes = () => {
  const [response, setResponse] = useState({});
  useEffect(() => {
    const fetchData = async () => {

      const currentTime = new Date().toISOString();
      const result = await fetch(
        `https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area:SNCF:87286526&to=stop_area:SNCF:87286005&datetime=${currentTime}&min_nb_journeys=2`,
        {
          headers: {
            Authorization:  process.env.REACT_APP_SNCF_API_KEY,
          },
        }
      );
      const data = await result.json(); // parse the response as JSON
      console.log(data); // log the data returned from the API
      setResponse(data);
    };

  useEffect(() => {
    fetchData();
  }, []);

  
  const rows = [];

  if (response.hasOwnProperty('journeys') && Array.isArray(response.journeys)) {
    for (const journey of response.journeys) {
      if (journey.hasOwnProperty('sections') && Array.isArray(journey.sections)) {
          if (journey.sections[1].hasOwnProperty('type') && journey.sections[1].type === 'public_transport') {
            if (journey.sections[1].hasOwnProperty('from') && journey.sections[1].from.hasOwnProperty('name')) {
              if (journey.sections[1].hasOwnProperty('to') && journey.sections[1].to.hasOwnProperty('name') ) {
                
                rows.push({
                  name_depart : journey.sections[1].from.stop_point.name,
                  name_arrivee : journey.sections[1].to.stop_point.name,
                  depart: journey.sections[1].departure_date_time,
                  arrivee: journey.sections[1].arrival_date_time,
                });
                
                //console.log("Hello",journey.sections[1].from.name,journey.sections[1].departure_date_time,journey.sections[1].to.name,journey.sections[1].arrival_date_time,);
              }
            }
          }
      }
    }
  }
  


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
    <div>
        <JourneyTimes startstation='stop_area:SNCF:87286526' arrivalstation='stop_area:SNCF:87286005' cursorvalue = {selectedValue}/>
   </div>


   <div>
        <JourneyTimes startstation='stop_area:SNCF:87286005' arrivalstation='stop_area:SNCF:87286526' cursorvalue = {selectedValue}/>
   </div>
   <div  style ={{display: "flex", flexDirection: "column", margin: 'auto',marginTop : '100px' }} >
      <button onClick={JourneyTimes.fetchData} style={{width: '80px',height : '50px',borderRadius :'2px'}} >Refresh</button>
      </div>
   </div>

  );
}

export default App;