import React, { useState, useEffect } from 'react';


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
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '500px', maxWidth: '1000px' }}>
      {rows.map((row, index) => {
        const depart = row.depart;
        const arrivee = row.arrivee;
        const heureDepart = `${depart.slice(9, 11)}:${depart.slice(11, 13)}`;
        const heureArrivee = `${arrivee.slice(9, 11)}:${arrivee.slice(11, 13)}`;
        return (
          <div key={row.name} style={{ display: 'block'}}>
            <div style={{ paddingLeft: '20px', width: '300px', marginTop: '0px' }}>
              <h3>{row.name}</h3>
              <div style={{ display: 'flex'}}>
              <p style={{ marginRight: '20px', fontSize: '12px' }}>{row.name_depart}</p>
              <p style={{ marginRight: '20px', fontWeight: 'bold' }}>{heureDepart}</p>
              <p style={{ marginRight: '20px', fontSize: '12px' }}>{row.name_arrivee}</p>
              <p style={{ marginRight: '20px', fontWeight: 'bold' }}>{heureArrivee}</p>


              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
  
  
  
  
};

export default JourneyTimes;
