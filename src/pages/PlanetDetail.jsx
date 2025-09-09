import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

export const PlanetDetail = () => {
  const { store, dispatch } = useGlobalReducer();
  const { theID } = useParams();
  const [details, setPlanetDetails] = useState(null);

  useEffect(() => {
    fetch(store.baseURL + "planets/" + theID)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Planet details tag:", data);
        setPlanetDetails(data.result.properties);
      })
      .catch(err => console.error("Error fetching details:", err));
  }, [theID, store.baseURL]);

  if (!details){
    return <p>Loading planet details...</p>;
  }

  const isFavorite = store.favorites.some(fav => fav.uid === theID);

  return (
    <div className="card m-3">
      <div className="card-body">
        <h2 className="card-title">{details.name}</h2>
        <p>Climate: {details.climate}</p>
        <p>Diameter: {details.diameter}</p>
        <p>Gravity: {details.gravity}</p>
        <p>Population: {details.population}</p>

        <button
          type="button"
          className={`btn ${isFavorite ? "btn-warning" : "btn-primary"}`}
          onClick={() =>
            dispatch({ type: "toggle-favorite", payload: { ...details, uid: theID } })
          }
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};
