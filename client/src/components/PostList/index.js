import React, { useEffect, useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import * as ReactDOM from "react-dom";

import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import { SAVE_TRIP, REMOVE_POST } from "../../utils/mutations";
import { QUERY_ME, QUERY_POSTS } from "../../utils/queries";

const PostList = ({ posts, trips, title }) => {
  //display buttons
  // const [showRemove, setShowRemove] = useState(true);
  // const [showSave, setShowSave] = useState(true);
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const [postLists, setPostLists] = useState(posts);
  const user = data?.me || [];
    //arrays to find saved trips and all posts
    var savedTripsArr = [];
    //array for posts that current user has
    var postsArr = [];
    //array for ids present in savedTrips and posts
    var inCommon = [];
  //function that determines the whether current user has post
  function userData(id) {
    // var checkId = id;
    // console.log(useParams);


    for (let i = 0; i < posts.length; i++) {
      postsArr.push(posts[i]._id);
    }
     if (Auth.loggedIn()) {
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
    console.log(savedTripsArr);
 
   if(savedTripsArr.includes(id)){
     if(inCommon.includes(id)){
     return (<><div>
     <button
       className="btn ml-auto"
      //  onClick={() => {
      //    handleClick(post);
      //  }}
     >
       Save Trip
     </button>
     </div></>);
     }
   }
   else{
     return false;
   }
  }
  //}

  const [deletePost, { error }] = useMutation(REMOVE_POST);
  //useeffect for refetching query
  useEffect(() => {
    refetch();
  }, [refetch]);

  const [saveTrip] = useMutation(SAVE_TRIP);

  const handleClick = async (post) => {
    refetch();
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
      setPostLists(postLists.filter((savedPost) => savedPost._id !== post._id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h3>{title}</h3>
      {postLists &&
        postLists.map((post) => (
          <div key={post._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${post.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {post.username}
              </Link>{" "}
              post on {post.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/post/${post._id}`}>
                <p>{post.location}</p>
                <p>{post.cost}</p>
                <p>{post.pointsOfInterest}</p>
                <p>{post.transport}</p>
                <p>{post.extra}</p>
                <p className="mb-0">
                  Replies: {post.replyCount} || Click to{" "}
                  {post.replyCount ? "see" : "start"} the discussion!
                </p>
              </Link>

              {!loading && userData(post._id)!==null && Auth.loggedIn() ? (
                  <button
                  onClick={() => {
                    handleRemovePost(post);
                  }}
                >
                  Remove Post
                </button>
              ) : (
             
                <></>
              )}
             
              { !Auth.loggedIn()&&!userData(post._id) ? <div>sign in to add/remove posts</div> : <div></div>}
            
            
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;


{/* <div>
<button
  className="btn ml-auto"
  onClick={() => {
    handleClick(post);
  }}
>
  Save Trip
</button>
</div> */}