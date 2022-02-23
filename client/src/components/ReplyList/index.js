import React from 'react';
import { Link } from 'react-router-dom';

const ReplyList = ({ replies }) => {
  return (

    <div className="list-cont">
  <div className="card-header-2">
    <span> ----------------- REPLIES 📩 ------------------</span>
  </div>
  <div className="cont-list-card">
    {replies &&
      replies.map(reply => (
        <p key={reply._id}>
          {reply.replyBody} <br></br>{' '}
          <Link to={`/profile/${reply.username}`} style={{ fontWeight: 700, fontSize: 16 }}>
          <span className="card-header-text-2">{reply.username}</span>on {reply.createdAt}
          </Link>
        </p>
      ))}
  </div>
</div>
  );
};

export default ReplyList;