import React from "react";

import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import {REMOVE_TRIP} from '../utils/mutations'
import { useMutation, useQuery } from "@apollo/client";
// import { QUERY_TRIP } from '../utils/queries';
import { QUERY_ME } from "../utils/queries";
// import { QUERY_ME_BASIC } from '../utils/queries';

const SavedTrips = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeTrip, {error}] = useMutation(REMOVE_TRIP);
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
        <div key={trip._id}>
          {/* {console.log(index)} */}
          <Card>
            
          {/* <Link to={`post/${trip._id}`}> */}
            {/* <p>{trip._id}</p> */}
            <p>{trip.location}</p>
            <p>${trip.cost}</p>
            {/* {console.log(trip._id.toString())} */}
            <button onClick={()=>handleDeleteTrip(trip._id,index)}>Remove trip</button>
          {/* </Link> */}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SavedTrips;
