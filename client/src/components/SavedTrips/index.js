import React,{useEffect} from "react";

import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { Link, } from "react-router-dom";

import Auth from "../../utils/auth";
import {REMOVE_TRIP} from '../../utils/mutations'
import { useMutation, useQuery, } from "@apollo/client";

import { QUERY_ME } from "../../utils/queries";

const SavedTrips = () => {
  
  const { loading, data,refetch } = useQuery(QUERY_ME);
  useEffect(()=> {
    refetch()
}, [refetch])
  const [removeTrip, {error}] = useMutation(REMOVE_TRIP,{refetchQueries: [
    QUERY_ME,// DocumentNode object parsed with gql
    //'me' // Query name
  ]},);
  const user = data?.me || [];

  //console.log(user);

  // create function that accepts the trip's mongo _id value as param and deletes the trip from the database
  const handleDeleteTrip = async (_id,index) => {
    console.log((_id));
    console.log(index);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {

      await removeTrip({
      variables: { _id,index }
    });

    // console.log(postId);
    //   removeTripId(id);
    } catch (err) {
      console.error(err);
    }
  };
 

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div>
      <h1>Saved Trips</h1>
      {user.savedTrips.map((trip,index) => (
        <div className="saved-cont" key={trip._id}>
       
          <div className="card-saved">
            
           <Link to={`post/${trip._id}`}> 
            
            <p className="link-p">{trip.location}</p>
            </Link> 
            <p>${trip.cost}</p>
           
            <button className="btn-submit" onClick={()=>handleDeleteTrip(trip._id,index)}>Remove</button>
           
          </div>
        </div>


      ))}
    </div>
  );
};

export default SavedTrips;