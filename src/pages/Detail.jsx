import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import storeReducer from "../store";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Detail = () => {
    const {store, dispatch} =useGlobalReducer()
    const {theID} = useParams()

    const getDetails = () => {
        fetch(store.baseURL + "people/" + theID)
        .then((resp) => resp.json())
        .then((data) => console.log("Character details tag: ", data))
    }
    useEffect(
        () => {
            getDetails()
        },[]
    )
    return(
        <div>
            Detail
            <Link to="/">
                <button
                type="button"
                className="btn btn-primary">
                    Home
                </button>    
            </Link>
            {theID}
        </div>
    )
};
