import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';
import ReplyList from '../components/ReplyList';
import ReplyForm from '../components/ReplyForm';
import Auth from '../utils/auth';


const SinglePost = props => {

  const { id: postId } = useParams();

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { id: postId }
  });
  
  const post = data?.post || {};
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="single-post-title">viewing {post.username}'s trip..</h3>
  <div className="list-cont">
    <p className="card-header">
      <span style={{ fontWeight: 700 }} className="card-header-text">
        {post.username}
      </span>{' '}
      <p className="date-text"> {post.createdAt}</p>
    </p>
    <div className="cont-list-card">
    <p>{post.location}</p>
    <p>{post.cost}</p>
    <p>{post.pointsOfInterest}</p>
    <p>{post.transport}</p>
    <p>{post.extra}</p>
    </div>
  </div>

  {post.replyCount > 0 && <ReplyList replies={post.replies} />}
  {Auth.loggedIn() && <ReplyForm postId={post._id} />}
</div>

  );
};

export default SinglePost;
