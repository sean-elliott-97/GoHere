import React from 'react';
import Auth from '../utils/auth';

import { useQuery } from '@apollo/client';
import { QUERY_POSTS, QUERY_ME_BASIC, QUERY_TRIP } from '../utils/queries';

import PostList from '../components/PostList';
import FriendList from '../components/FriendList';
import PostForm from '../components/PostForm';



const Home = () => {

  const loggedIn = Auth.loggedIn();


  // use useQuery hook to make query request
  const { loading, data, } = useQuery(QUERY_POSTS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData, } = useQuery(QUERY_ME_BASIC);
  
  const posts = data?.posts || [];
  // const savedTrips = data?.savedTrips||[];

  return (
    <main>
   <div className="flex-row justify-space-between">
    {loggedIn && (
      <div className="col-12 mb-3">
        <PostForm />
      </div>
    )}
    <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
  {loading ? (
    <div>Loading...</div>
  ) : (
    <PostList posts={posts} title="Some Feed for Post(s)..." />
  )}
</div>

{loggedIn && userData ? (
  <div className="col-12 col-lg-3 mb-3">
    {/* {console.log(savedTrips)} */}
    {/* {console.log(tripData)} */}
    {console.log(userData)}
    {console.log(loggedIn)}
    <FriendList
      username={userData.me.username}
      friendCount={userData.me.friendCount}
      friends={userData.me.friends}
    />
  </div>
) : <></>}

  </div>
</main>

  );
};

export default Home;