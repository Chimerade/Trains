import React, { useState, useEffect } from 'react';

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
  const [selectedValue, setSelectedValue] = useState(15); // curseur


  useEffect(() => {
    const fetchData = async () => {
      const currentTime = new Date().toISOString();
      const result = await fetch(
        `https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area:SNCF:87286526&to=stop_area:SNCF:87286005&datetime=${currentTime}&min_nb_journeys=4`,
        {
          headers: {
            Authorization:  process.env.REACT_APP_SNCF_API_KEY,
          },
        }
      );
      const data = await result.json(); // parse the response as JSON
      setResponse(data);
    };

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
    <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Display the slider */}
        <input
          type="range"
          min={15}
          max={30}
          value={selectedValue}
          step="5"
          onChange={(event) => {
            setSelectedValue(event.target.value);
          }}
          style={{ height: "5px", width: "100px", margin: "auto",marginTop : '20px' }}
        />
        {/* Display the selected value */}
        <p style={{ fontSize: "12px", margin: "auto", justifyContent: "center",paddingTop : '10px' }}>
          Temps Max: {selectedValue}
        </p>

  

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '500px', maxWidth: '1000px', margin: 'auto' }}>


        {rows.map((row, index) => {
          const depart = row.depart;
          const arrivee = row.arrivee;

          const formatted_start = new Date(createFormattedDate(depart));
          const formatted_end = new Date(createFormattedDate(arrivee));

          const heureDepart = `${depart.slice(9, 11)}:${depart.slice(11, 13)}`;
          const heureArrivee = `${arrivee.slice(9, 11)}:${arrivee.slice(11, 13)}`;

          const diff = (new Date(formatted_end) - new Date(formatted_start)) / (1000 * 60); // Différence en minutes

          if (diff <= selectedValue) {
            return (
              <div key={row.name} style={{ display: 'block', marginBottom: '-35px', borderBottom: '1px solid grey' }}>
                <div style={{ paddingLeft: '0px', marginTop: '35px' }}>
                  <h3>{row.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px' }}>
                    <p style={{ marginRight: '20px', fontSize: '12px', width: '75px', textOverflow: 'ellipsis', overflow: 'hidden', lineHeight: '1' }}>{row.name_depart}</p>
                    <p style={{ marginRight: '20px', fontWeight: 'bold', width: '40px' }}>{heureDepart}</p>
                    <p style={{ marginRight: '20px', fontSize: '12px', width: '75px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.name_arrivee}</p>
                    <p style={{ marginRight: '20px', fontWeight: 'bold', width: '40px' }}>{heureArrivee}</p>
                  </div>

                </div>
              </div>
            );
          } return null;
        })}

      </div>
    </div>
  );
  
  
  
  
};

export default JourneyTimes;
