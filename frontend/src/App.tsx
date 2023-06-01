import React, { FC } from "react";
import axios from "axios";

const App: FC = () => {
  axios
    .get("http:localhost:8000/places")
    .then(response => {
      // Handle the successful response here
      console.log(response.data);
    })
    .catch(error => {
      // Handle errors here
      console.error(error);
    });

  return <div>front działa</div>;
};

export default App;
