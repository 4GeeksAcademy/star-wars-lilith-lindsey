import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const Favorites = () => {
  const { store } = useGlobalReducer();

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Favorites
      </button>
      <ul className="dropdown-menu">
        {store.favorites.length > 0 ? (
          store.favorites.map((fav) => (
            <li key={fav.uid}>
              <Link className="dropdown-item" to={`/detail/${fav.uid}`}>
                {fav.name}
              </Link>
            </li>
          ))
        ) : (
          <li>
            <span className="dropdown-item-text text-muted">
              No favorites yet
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};