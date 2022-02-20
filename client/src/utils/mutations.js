import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const SAVE_TRIP = gql`
  mutation saveTrip($id: ID!) {
    saveTrip(postId: $id) {    
      
        _id
        location
        cost
        pointsOfInterest
        transport
        extra

    }
  }
`;
export const REMOVE_TRIP=gql`
mutation removeTrip($_id:ID!, $index: Int!){
  removeTrip(_id:$_id, index:$index){
    _id
    cost
    extra
    location
    pointsOfInterest
    transport

  }
}




`

export const ADD_POST = gql`
  mutation addPost($location: String!, $cost: Int!, $pointsOfInterest: String!, $transport: String!, $extra: String!) {
    addPost(location: $location, cost: $cost, pointsOfInterest: $pointsOfInterest, transport: $transport, extra: $extra) {
      _id
      location
      cost
      pointsOfInterest
      transport
      extra
      replyCount
      replies {
        _id
      }
    }
  }
`;

export const ADD_REPLY = gql`
  mutation addReply($postId: ID!, $replyBody: String!) {
    addReply(postId: $postId, replyBody: $replyBody) {
      _id
      replyCount
      replies {
        _id
        replyBody
        createdAt
        username
      }
    }
  }
`;