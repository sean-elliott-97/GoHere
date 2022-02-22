import React from 'react';

import Auth from '../../utils/auth';

import { Link } from 'react-router-dom';



import { useMutation } from '@apollo/client';


import { SAVE_TRIP,} from '../../utils/mutations';



const PostList = ({ posts, title }) => {


  const loggedIn = Auth.loggedIn();

  const [saveTrip] = useMutation(SAVE_TRIP);
 
  
  
  const handleClick = async (post) => {
  
    console.log(post._id)

    try {
      await saveTrip({
        variables: { id: post._id }
      });
    } catch (e) {
      console.error(e);
    }
  };
  // const handleRemovePost = async(post)=>{
  //   console.log(post._id);
  //   try{
  //     await removePost({_id:post._id}
  //   );
  // }catch(e){
  //   console.error(e);
  // }
  // }

  // if (!posts.length) {
  //   return <h3>No trips posted..</h3>;
  // }

  const [showSaved, setShowSaved] = React.useState(false)
  const onClick = () => setShowSaved(true)


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
               
            
            {console.log(post._id)}
            </div>
            {/* <button onClick={()=>{handleRemovePost(post)}}>Remove Post</button> */}
          </div>
        ))}
    </div>
  );
};

export default PostList;