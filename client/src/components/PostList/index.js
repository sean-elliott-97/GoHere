import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useMutation} from '@apollo/client';



import { SAVE_TRIP } from '../../utils/mutations';



const PostList = ({ posts, title }) => {




  //console.log(posts)

 

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

  if (!posts.length) {
    return <h3>No trips posted..</h3>;
  }




  return (
    <div>
      <h3>{title}</h3>
      {posts &&
        posts.map(post=> (
          
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
                <p>{post.location}</p>
                <p>{post.cost}</p>
                <p>{post.pointsOfInterest}</p>
                <p>{post.transport}</p>
                <p>{post.extra}</p>
                <p className="mb-0">
                Replies: {post.replyCount} || Click to{' '}
                {post.replyCount ? 'see' : 'start'} the discussion!
                </p>
            </Link>
               <Button className="btn ml-auto" onClick={() => { handleClick(post) }}>
                 Save Trip
                </Button>

            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;