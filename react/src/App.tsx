import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios, { AxiosError, AxiosResponse } from 'axios';
import TopBar from './containers/TopBar/TopBar';
import Map from './containers/Map/Map';

import './App.scss';

export interface VisitsData {
  id: string;
  name: string;
  visits: number;
}

const App = () => {
  const [stateData, setStateData] = useState<VisitsData[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:1337/visits')
      .then((axiosResponse: AxiosResponse<{ data: VisitsData[] }>) => {
        setStateData(axiosResponse.data.data);
      })
      .catch((e: AxiosError) => {
        console.error(e.code, e.message);
      });
  }, []);

  return (
    <>
      <TopBar />
      <div className="content">{stateData.length > 0 && <Map data={stateData} />}</div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
