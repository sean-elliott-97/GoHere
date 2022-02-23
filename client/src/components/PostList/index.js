import React, { useEffect, useState } from "react";
import { Link, Redirect, useParams, } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import { SAVE_TRIP, REMOVE_POST } from "../../utils/mutations";
import { QUERY_ME, QUERY_POSTS,  } from "../../utils/queries";
import Pre from '../../images/pre-heart.png'
import Post from '../../images/post-heart.png'

const PostList = ({ posts, trips, title, userParam}) => {
  
  const loggedIn = Auth.loggedIn();
  //display buttons
  // const [showRemove, setShowRemove] = useState(true);
  // const [showSave, setShowSave] = useState(true);
  
  const { loading, data, refetch } = useQuery(QUERY_ME,);
  const [postLists, setPostLists] = useState(posts)
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

  const [deletePost, { error }] = useMutation(REMOVE_POST, );

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
    refetch();
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
      setPostLists(postLists.filter(savedPost=>savedPost._id!==post._id))
      refetch();
    } catch (e) {
      console.error(e);
    }

   
  };

  
const userParameters = userParam && userParam.userParam;

  return (
    <div>
      <h3>{title}</h3>
      <div className="list-cont">
      {posts &&
        posts.map(post => (
          
          <div  key={post._id}>
            <p className="card-header">
            <Link
                to={`/profile/${post.username}`}
                style={{ fontWeight: 700 }}
                className="card-header-text"
            >
                {post.username}
            </Link>{' '}

            <p className="date-text"> {post.createdAt}</p>  
            </p>
            <div className="cont-list-card">
            <Link className="cont-list-card" to={`/post/${post._id}`}>
            <p><span>location: </span>{post.location}</p>
            <p><span>cost: $</span>{post.cost}</p>
            <p><span>points of interest: </span>{post.pointsOfInterest}</p>
            <p><span>transportation: </span>{post.transport}</p>
            <p><span>summary: </span>{post.extra}</p>
            
                </Link>

                
                <div className="btn-cont-list">
                <p className="mb-0">
                <Link className="link-p" to={`/post/${post._id}`}>Reply:</Link>{post.replyCount} 
                </p>
                { !loading && !userData(post._id) ? (
                <Link
                  className="pre-heart"
                  onClick={() => {
                    handleClick(post);
                    console.log(post._id);
                  }}
                >
                <img className="pre-heart" src={Pre} />
                </Link>
              ) : (
                <>
              <img className="post-heart" src={Post} />
              
                </>
              )}
                
                
                
                  
                
                
              </div>
               
            
            </div>
            {/* <button onClick={()=>{handleRemovePost(post)}}>Remove Post</button> */}
          </div>
        ))}
    </div>
    </div>
  );
};

export default PostList;