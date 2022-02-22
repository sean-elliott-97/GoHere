import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import Auth from '../../utils/auth';
import { SAVE_TRIP, REMOVE_POST } from "../../utils/mutations";
import { QUERY_ME,QUERY_POSTS } from "../../utils/queries";


const PostList = ({ posts, trips, title }) => {

  const loggedIn = Auth.loggedIn();
  
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const user = data?.me || [];
  console.log(user.savedTrips);

  
  const [deletePost, { error }] = useMutation(REMOVE_POST,{refetchQueries:[QUERY_POSTS]});

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [saveTrip] = useMutation(SAVE_TRIP);
  // const [removePost]=useMutation(REMOVE_POST);
  const [show, setShow] = useState(true);

  console.log(posts);
  // console.log(user.savedTrips[0]);

  const handleClick = async (post) => {
    // console.log(post._id)

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
                
                {loggedIn && (   

                <div>

                <button className="btn-trip ml-auto" onClick={() => { handleClick(post) }}>Like</button> 
                

                </div>

                

                )}
               
               <button
              onClick={() => {
                handleRemovePost(post);
              }}
            >
              Remove Post
              </button>
            
            </div>
            {/* <button onClick={()=>{handleRemovePost(post)}}>Remove Post</button> */}
          </div>
        ))}
    </div>
  );
};

export default PostList;