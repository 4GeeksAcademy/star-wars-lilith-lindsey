import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Home = () => {

  const {store, dispatch} =useGlobalReducer()
	
 	 const getPeople = () => {
		fetch(store.baseURL + "people")
		.then(
			(resp) => {
				return resp.json()
			}
		)
		.then( 
			(data) => {
			dispatch({
				type: "set-people",
				payload: data.results
			}
			)
			}
			)
		}
		useEffect(() => {
			getPeople()
			},[])

	
	return (
		<div className="text-center mt-5">
			<h1>Hello</h1>
			<div className= "characterContainer d-flex">
			{store.people.length > 0 ? (
  				store.people.map(
					(person, i) => (
    				<div key={i}>
      					<p>{person.name}</p>
      					<Link to={"/detail/" + person.uid}>
        					<button type="button" className="btn btn-primary">
          						Click for Details
        					</button>
							<button 
								type="button" 
								clasName="btn btn-primary" 
								onclick = {()=>{
									dispatch(
										{type: "set-favorites", payload: people.name}
										)
									}
								}>
								Favorites
							</button>
      					</Link>
					
    			</div>
					
  				))
			) : (
  		<p>loading...</p>
		)}

		</div>
		</div>
	);
}; 