import React  from 'react';
 
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Auth from '../utils/auth';

import {  useQuery } from '@apollo/client';

import { QUERY_ME } from '../utils/queries';

const SavedTrips = () => {
 

  //const [removetrip, {error}] = useMutation(REMOVE_trip);
  const { loading, data} = useQuery(QUERY_ME);
  
  const user = data?.me || [];



  // create function that accepts the trip's mongo _id value as param and deletes the trip from the database
 /* const handleDeletetrip = async (tripId) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {

      await removetrip({
      variables: { tripId }
    });

      
      removetripId(tripId);
    } catch (err) {
      console.error(err);
    }
  };
  */

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div>
      HELLOO
      {user.savedTrips.map(trip => (
        <div key={trip.id}>
            <Link to={`post/${trip._id}`}>
            {trip.location} 
            </Link>
        </div>
      ))}
    </div>
  );
};

export default SavedTrips;
