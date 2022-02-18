import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
  query posts($username: String) {
    posts(username: $username) {
      _id
      location
      cost
      pointsOfInterest
      transport
      extra
      createdAt
      username
      replyCount
      replies {
        _id
        createdAt
        username
        replyBody
      }
    }
  }
`;

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
      _id
      location
      cost
      pointsOfInterest
      transport
      extra
      createdAt
      username
      replyCount
      replies {
        _id
        createdAt
        username
        replyBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      posts {
        _id
        location
        cost
        pointsOfInterest
        transport
        extra
        createdAt
        replyCount
      }
    }
  }
`;


export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friendCount
      savedTrips {
        _id
        location
        cost
        pointsOfInterest
        transport
        extra
      }
      posts {
        _id
        location
        cost
        pointsOfInterest
        transport
        extra
        createdAt
        replyCount
        replies {
          _id
          createdAt
          replyBody
          username
        }
      }
      friends {
        _id
        username    
      }
      
      
      
      
    }
    
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount  
      friends {
        _id
        username
      }
    }
  }
`;