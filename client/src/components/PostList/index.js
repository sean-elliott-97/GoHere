import React, { useEffect, useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import { SAVE_TRIP, REMOVE_POST } from "../../utils/mutations";
import { QUERY_ME, QUERY_POSTS } from "../../utils/queries";

const PostList = ({ posts, trips, title }) => {
 
 
  const loggedIn = Auth.loggedIn();
  const { username: userParam } = useParams(); //display buttons
  // const [showRemove, setShowRemove] = useState(true);
  // const [showSave, setShowSave] = useState(true);
  const { loading, data, refetch } = useQuery(QUERY_ME);

  const user = data?.me || [];

  // //array for ids present in savedTrips and posts
  // let inCommon = [];

  function userData(id) {
    // var checkId = id;

    //function for finding which elements savedTrips and posts have in common
    // function findCommonElements() {
    // if (!loading) {
      //arrays to find saved trips and all posts
      var savedTripsArr = [];
      var postsArr = [];
      //array for ids present in savedTrips and posts
      var inCommon = [];
      for (let i = 0; i < posts.length; i++) {
        postsArr.push(posts[i]._id);
      }
      if(Auth.loggedIn()){
      if (user.savedTrips.length >= 1 || user) {
        for (let j = 0; j < user.savedTrips.length; j++) {
          savedTripsArr.push(user.savedTrips[j]._id);
        }
      }
    }
      //pushes to inCommon array
      savedTripsArr.filter((val) => {
        inCommon.push(val);
      });

      console.log(postsArr);
      console.log(inCommon);

      if (inCommon.includes(id) && savedTripsArr.includes(id)) {
        console.log("post array has the id provided");
        return true;
      }
    }
  //}

  const [deletePost, { error }] = useMutation(REMOVE_POST, {
    refetchQueries: [QUERY_POSTS],
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [saveTrip] = useMutation(SAVE_TRIP);

  const handleClick = async (post) => {
   
    try {
      await saveTrip({
        variables: { id: post._id },
      });
    } catch (e) {
      console.error(e);
    }

  };

  const handleRemovePost = async (post) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await deletePost({
        variables: { postId: post._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  


  return (
    <div>
      <h3>{title}</h3>
      {posts &&
        posts.map(post => (
          
          <div key={post._id} className="card mb-3">
            <p className="card-header">
            <Link
                to={`/profile/${post.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
            >
                {post.username}
            </Link>{' '}
            post on {post.createdAt}
            </p>
            <div className="card-body">
            <Link to={`/post/${post._id}`}>
                <p><span>Location: </span>{post.location}</p>
                <p><span>Cost: </span>{post.cost}</p>
                <p><span>Places visited: </span>{post.pointsOfInterest}</p>
                <p><span>Transportation: </span>{post.transport}</p>
                <p><span>Summary: </span>{post.extra}</p>
                <p className="mb-0">
                <span>Replies: </span>{post.replyCount} 
                </p>
                </Link>
                
                {loggedIn &&  (   

                <div>

                <button className="btn-trip ml-auto" onClick={() => { handleClick(post) }}>Like</button> 
                <button
              onClick={() => {
                handleRemovePost(post);
              }}
            >
              Remove Post
              </button>
                

                </div>

                

                )}
               
              
            
            </div>
            {/* <button onClick={()=>{handleRemovePost(post)}}>Remove Post</button> */}
          </div>
        ))}
    </div>
  );
};

export default PostList;