import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const getPeople = () => {
    fetch(store.baseURL + "people")
      .then((resp) => resp.json())
      .then((data) =>
        dispatch({ type: "set-people", payload: data.results })
      )
      .catch((err) => console.error("Error fetching people:", err));
  };

  const getPlanets = () => {
    fetch(store.baseURL + "planets")
      .then((resp) => resp.json())
      .then((data) =>
        dispatch({ type: "set-planets", payload: data.results })
      )
      .catch((err) => console.error("Error fetching planets:", err));
  };

  const getVehicles = () => {
    fetch(store.baseURL + "vehicles")
      .then((resp) => resp.json())
      .then((data) =>
        dispatch({ type: "set-vehicles", payload: data.results })
      )
      .catch((err) => console.error("Error fetching vehicles:", err));
  };

  useEffect(() => {
    getPeople();
    getPlanets();
	getVehicles();
  }, []);

  return (
    <div className="text-center">
      <h1>The People...</h1>
      <div
        className="characterContainer d-flex"
        style={{ overflowX: "auto", gap: "1rem", padding: "1rem" }}
      >
        {store.people.length > 0 ? (
          store.people.map((person) => (
            <div key={person.uid} className="card p-3" style={{ minWidth: "200px" }}>
              <p>{person.name}</p>
              <Link to={`/detail/${person.uid}`}>
                <button className="btn btn-primary mb-2">Click for Details</button>
              </Link>
              <button
                className="btn btn-warning"
                onClick={() => dispatch({ type: "toggle-favorite", payload: person })}
              >
                {store.favorites.some((fav) => fav.uid === person.uid)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <h1>The Galaxy...</h1>
      <div
        className="planetContainer d-flex"
        style={{ overflowX: "auto", gap: "1rem", padding: "1rem" }}
      >
        {store.planets.length > 0 ? (
          store.planets.map((planet) => (
            <div key={planet.uid} className="card p-3" style={{ minWidth: "200px" }}>
              <p>{planet.name}</p>
              <Link to={`/planetdetail/${planet.uid}`}>
                <button className="btn btn-primary mb-2">Click for Details</button>
              </Link>
              <button
                className="btn btn-warning"
                onClick={() => dispatch({ type: "toggle-favorite", payload: planet })}
              >
                {store.favorites.some((fav) => fav.uid === planet.uid)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
            </div>
			
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
	  <h1>The Vehicles...</h1>
      <div
        className="vehicleContainer d-flex"
        style={{ overflowX: "auto", gap: "1rem", padding: "1rem" }}
      >
        {store.vehicles.length > 0 ? (
          store.vehicles.map((vehicle) => (
            <div key={vehicle.uid} className="card p-3" style={{ minWidth: "200px" }}>
              <p>{vehicle.name}</p>
              <Link to={`/vehicledetail/${vehicle.uid}`}>
                <button className="btn btn-primary mb-2">Click for Details</button>
              </Link>
              <button
                className="btn btn-warning"
                onClick={() => dispatch({ type: "toggle-favorite", payload: vehicle })}
              >
                {store.favorites.some((fav) => fav.uid === vehicle.uid)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
            </div>
			
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};