import React, { FC } from "react";
import axios from "axios";

const App: FC = () => {
  const baseURL = process.env.REACT_APP_API_URL as string;
  axios
    .get(`${baseURL}/favourite-places`)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });

  return <div>front działa</div>;
};

export default App;
