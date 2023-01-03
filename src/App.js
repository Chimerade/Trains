import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JourneyTimes = () => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const currentTime = new Date().toISOString();
      const result = await axios(
        `https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area:SNCF:87286526&to=stop_area:SNCF:87286005&datetime=${currentTime}&min_nb_journeys=5`,
        { auth: ['a27f39bc-3865-4451-8790-01f23ef38bd4', ''] }
      );
      console.log(result.data); // log the data returned from the API
      setResponse(result.data);
    };

    fetchData();
  }, []);

  const rows = [];

  for (let r = 0; r < 2; r++) {
    const session = response['journeys'][r]['sections'][1];
    if ('stop_date_times' in session) {
      for (const i of session['stop_date_times']) {
        rows.push({
          name: i['stop_point']['name'],
          depart: i['departure_date_time'],
          arrivee: i['arrival_date_time']
        });
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
