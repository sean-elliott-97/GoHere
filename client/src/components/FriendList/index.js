import React from 'react';
import { Link } from 'react-router-dom';

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return <p></p>;
  }

  return (
    <div className="following-cont">
      <h5>
        following {friendCount} 
      </h5>
      {friends.map(friend => (
        <button className="btn-submit-following " key={friend._id}>
          <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default FriendList;