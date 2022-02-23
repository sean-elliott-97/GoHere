import React from 'react';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS, QUERY_ME_BASIC, QUERY_ME, QUERY_USER } from '../utils/queries';
import { useParams } from 'react-router-dom';

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

  const meData = userData && userData.me.username
 console.log(meData)
  



  // const savedTrips = data?.savedTrips||[];
  //PostList(posts)

  
  
 
  const [showForm, setShowForm] = React.useState(false)
  const show = () => setShowForm(true)
  const hide = () => setShowForm(false)
  
  
 
  
 
 
  return (
    <main>
      {!loggedIn ? (
        <div className="landing-buttons">
        <h1 className="home-title">hello. welcome to goHere,</h1>
        <h4>where you can find your next destination at a button's click.</h4>
        <div className="home-btn-cont">
<Link className="landing-link" to="/login">Login</Link>
<Link className="landing-link" to="/signup">Sign Up</Link>
</div>
                </div>
                
      

) : (  <div className="landing-buttons">
<h1 className="home-title">hello {meData}. welcome to goHere,</h1>
<h4>where you can find your next destination at a button's click.</h4>


</div>
        
      )}
       
   <div className="flex-row justify-space-between">
    {loggedIn && (   
      
      <div className="col-12 mb-3">

   
         { showForm ? <PostForm hide={hide}/> : <button onClick={show} type="button" class="submit-green  btn-success">New Post</button>  }
        
      </div>
    )}
    <div className={`post-list-margin col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
  {loading ? (
    <div>loading...</div>
  ) : (
    <PostList posts={posts} title="latest posts..." />
  )}
</div>

{loggedIn && userData ? (
  <div className="col-12 col-lg-3 mb-3">
   <div className="friend-cont">
    <FriendList 
      username={userData.me.username}
      friendCount={userData.me.friendCount}
      friends={userData.me.friends}
    />
</div>
  
  </div>
  
) : <></>}

  </div>
</main>

  );
};

export default Home;