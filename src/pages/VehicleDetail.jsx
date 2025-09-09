import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

export const VehicleDetail = () => {
  const { store, dispatch } = useGlobalReducer();
  const { theID } = useParams();
  const [details, setVehicleDetails] = useState(null);

  useEffect(() => {
    fetch(store.baseURL + "vehicles/" + theID)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Vehicle details tag:", data);
        setVehicleDetails(data.result.properties);
      })
      .catch(err => console.error("Error fetching details:", err));
  }, [theID, store.baseURL]);

  if (!details){
    return <p>Loading vehicle details...</p>;
  }

  const isFavorite = store.favorites.some(fav => fav.uid === theID);

  return (
    <div className="card m-3">
      <div className="card-body">
        <h2 className="card-title">{details.name}</h2>
        <p>Cargo Capacity: {details.cargo_capacity}</p>
        <p>Crew: {details.crew}</p>
        <p>Manufacturer: {details.manufacturer}</p>
        <p>Model: {details.model}</p>

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
