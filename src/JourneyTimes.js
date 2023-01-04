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

const JourneyTimes = (props) => {

  const startstation = props.startstation;
  const arrivalstation = props.arrivalstation;
  const cursorvalue = props.cursorvalue;
  
  const [response, setResponse] = useState({});


  const fetchData = async () => {
    const currentTime = new Date().toISOString();

    const result = await fetch(
        
      `https://api.sncf.com/v1/coverage/sncf/journeys?from=${startstation}&to=${arrivalstation}&datetime=${currentTime}&min_nb_journeys=6`,
      {
        headers: {
          Authorization:  process.env.REACT_APP_SNCF_API_KEY,
        },
      }
    );
    
    const data = await result.json(); // parse the response as JSON
    setResponse(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const rows = [];

  if (response.hasOwnProperty('journeys') && Array.isArray(response.journeys)) {
    for (const journey of response.journeys) {
      if (journey.hasOwnProperty('sections') && Array.isArray(journey.sections)) {

          const lastSectionIndex = journey.sections.length - 2;
          const lastSection = journey.sections[lastSectionIndex];
          
          if (lastSection.hasOwnProperty('type') && lastSection.type === 'public_transport'){
            if (lastSection.hasOwnProperty('from') && lastSection.from.hasOwnProperty('name')) {
                if (lastSection.hasOwnProperty('to') && lastSection.to.hasOwnProperty('name') ) {
                
                rows.push({
                    name_depart: journey.sections[1].from.stop_point.name,
                    name_arrivee: lastSection.to.name,
                    depart: journey.departure_date_time,
                    arrivee: journey.arrival_date_time,
                });

              }
            }
          }
      }
    }
  }
  


  return (

    <div style={{ display: "flex", flexDirection: "column" ,width: '100%', maxWidth: '100%', margin: 'auto',paddingTop : '20px'}}>
       


  

      <div style={{ display: "flex", flexDirection: "column", margin: 'auto'  }}>


        {rows.map((row, index) => {
          const depart = row.depart;
          const arrivee = row.arrivee;

          const formatted_start = new Date(createFormattedDate(depart));
          const formatted_end = new Date(createFormattedDate(arrivee));

          const heureDepart = `${depart.slice(9, 11)}:${depart.slice(11, 13)}`;
          const heureArrivee = `${arrivee.slice(9, 11)}:${arrivee.slice(11, 13)}`;

          const diff = (new Date(formatted_end) - new Date(formatted_start)) / (1000 * 60); // Différence en minutes

          if (diff <= cursorvalue) {
            return (
              <div key={row.name} style={{ display: 'flex', marginBottom: '-35px', borderBottom: '1px solid grey',flexWrap: 'wrap',justifyContent: 'space-between' }}>
                <div style={{ paddingLeft: '0px', marginTop: '35px' }}>
                  <h3>{row.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px' }}>
                    <p style={{ marginRight: '20px', fontSize: '12px', width: '75px', textOverflow: 'ellipsis', overflow: 'hidden', lineHeight: '1' }}>{row.name_depart}</p>
                    <p style={{ marginRight: '20px', fontWeight: 'bold', width: '40px' }}>{heureDepart}</p>
                    <p style={{ marginRight: '20px', fontSize: '12px', width: '75px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.name_arrivee}</p>
                    <p style={{ marginRight: '20px', fontWeight: 'bold', width: '40px' }}>{heureArrivee} </p>
                    <p style={{ marginRight: '10px', fontWeight: 'normal', width: '40px',fontSize: '10px' }}>({diff}')</p>
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
