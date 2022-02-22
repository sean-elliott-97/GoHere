import React from 'react';
import Auth from '../utils/auth';

import { Redirect, useParams } from 'react-router-dom';

import PostList from '../components/PostList';
import FriendList from '../components/FriendList';
import PostForm from '../components/PostForm';

//import {SAVE_TRIP} from '../utils/mutations'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import SavedTrips from '../components/SavedTrips';



const Profile = () => {

  const loggedIn = Auth.loggedIn();

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const [addFriend] = useMutation(ADD_FRIEND);

  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is the logged-in user's
if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  return <Redirect to="/profile" />;
}

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page.  Sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className=" profile-follow-cont flex-row mb-3">

      <h2 className=" text-secondary p-3 display-inline-block">
        {userParam ? `${user.username}'s` : 'your'} profile
        
      </h2>
      {userParam, loggedIn && (
        
  <button className="btn-follow ml-auto" onClick={handleClick}>
    Follow
  </button>
)}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <PostList posts={user.posts} title={`Trips...`} />
        </div>
      </div>
{loggedIn && (   
      <div className="col-12 col-lg-3 mb-3">
    <FriendList
      username={user.username}
      friendCount={user.friendCount}
      friends={user.friends}
    />
  </div>
  )}
 
  
    </div>
  );
};

export default Profile;