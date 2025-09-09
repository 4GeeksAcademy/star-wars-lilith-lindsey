import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const getPeople = () => {
    fetch(store.baseURL + "people")
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({
          type: "set-people",
          payload: data.results,
        });
      })
      .catch((err) => console.error("Error fetching people:", err));
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div className="text-center">
    	<h1>The Galaxy...</h1>
    	<div className="characterContainer d-flex">
  			{store.people.map((person, i) => (
    		<div key={i} className="card">
      			<p>{person.name}</p>
      			<Link to={`/detail/${person.uid}`}>
        			<button type="button" className="btn btn-primary">
          				Click for Details
        			</button>
      			</Link>
      			<button
        			type="button"
        			className="btn btn-warning"
        			onClick={() =>
          				dispatch({
            				type: "toggle-favorite",
            				payload: person,
          				})
        			}>
        			{store.favorites.some((fav) => fav.uid === person.uid)
          			? "Remove from Favorites"
          			: "Add to Favorites"}
      			</button>
    		</div>
  		))}
		</div>
    </div>
  );
};