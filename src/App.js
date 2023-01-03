import React, { useState, useEffect } from 'react';

const JourneyTimes = () => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const currentTime = new Date().toISOString();
      const result = await fetch(
        `https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area:SNCF:87286526&to=stop_area:SNCF:87286005&datetime=${currentTime}&min_nb_journeys=5`,
        {
          headers: {
            Authorization: 'a27f39bc-3865-4451-8790-01f23ef38bd4',
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
        for (const session of journey.sections) {
          if (session.hasOwnProperty('stop_date_times') && session.stop_date_times.length > 0) {
            for (const stop of session.stop_date_times) {
              rows.push({
                name: stop.stop_point.name,
                depart: stop.departure_date_time,
                arrivee: stop.arrival_date_time,
              });
            }
          }
        }
      }
    }
  }
  

  return (
    <div>
      {rows.map(row => (
        <div key={row.name}>
          <h3>Name: {row.name}</h3>
          <p>Depart: {row.depart}</p>
          <p>Arrivee: {row.arrivee}</p>
        </div>
      ))}
    </div>
  );
};

export default JourneyTimes;
