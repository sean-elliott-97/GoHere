import React from 'react';
import { Link } from 'react-router-dom';
import {Card} from 'react-bootstrap';
import {useMutation} from '@apollo/client'
import Auth from "../../utils/auth";
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { REMOVE_FRIEND } from '../../utils/mutations';

const FriendList = ({ friendCount, username, friends }) => {
  const [removeFriend, {error}] = useMutation(REMOVE_FRIEND,{refetchQueries: [
    QUERY_ME, // DocumentNode object parsed with gql
    //'me' // Query name
  ]},);
  if (!friends || !friends.length) {
    return <p className="bg-dark text-light p-3">{username}, make some friends!</p>;
  }
  
   // create function that accepts the friends's mongo _id value as param and deletes the trip from the database
   const handleDeleteFriend = async (_id,index) => {
    console.log((_id));
    console.log(index);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {

      await removeFriend({
      variables: { _id,index }
    });

    // console.log(postId);
    //   removeTripId(id);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h5>
        {username}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
      </h5>
      {friends.map((friend,index) => (
        <div className="btn w-100 display-block mb-2" key={friend._id}>
          <Card>
          <p>{friend.username}</p>
          <button onClick={()=>handleDeleteFriend(friend._id,index)}>Remove Friend</button>
          </Card>
          {/* <Link to={`/profile/${friend.username}`}>{friend.username}</Link> */}
        </div>
        
      ))}
    </div>
  );

      }

export default FriendList;