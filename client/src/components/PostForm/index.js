import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';


const PostForm = () => {

    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: { addPost } }) {
          try {
            // could potentially not exist yet, so wrap in a try...catch
            const { posts } = cache.readQuery({ query: QUERY_POSTS });
            cache.writeQuery({
              query: QUERY_POSTS,
              data: { posts: [addPost, ...posts] }
            });
          } catch (e) {
            console.error(e);
          }
      
          // update me object's cache, appending new post to the end of the array
          const { me } = cache.readQuery({ query: QUERY_ME });
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, posts: [...me.posts, addPost] } }
          });
        }
      });

    const [extra, setText5] = useState('');
    const [cost, setText4] = useState('');
    const [pointsOfInterest, setText2] = useState('');
    const [transport, setText3] = useState('');
    const [location, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);


    const handleChange = event => {
        if (event.target.value.length <= 280) {
          setText(event.target.value);
        
          setCharacterCount(event.target.value.length);
        }
      };

      const handleChange2 = event => {
        if (event.target.value.length <= 280) {
          setText2(event.target.value);
        
          setCharacterCount(event.target.value.length);
        }
      };

      const handleChange3 = event => {
        if (event.target.value.length <= 280) {
          setText3(event.target.value);
        
          setCharacterCount(event.target.value.length);
        }
      };

      const handleChange4 = event => {
        if (event.target.value.length <= 280) {
          setText4(parseInt(event.target.value));
        
          setCharacterCount(event.target.value.length);
        }
      };


      const handleChange5 = event => {
        if (event.target.value.length <= 280) {
          setText5(event.target.value);
        
          setCharacterCount(event.target.value.length);
        }
      };


      const handleFormSubmit = async event => {
        event.preventDefault();
      
        try {
          // add post to database
          await addPost({
           
            variables: { location, cost, pointsOfInterest, transport, extra }
        
          });
         
      
          // clear form value
          setText('');
          setText2('');
          setText3('');
          setText4('');
          setText5('');
          setCharacterCount(0);
        } catch (e) {
          console.error(e);
        }
      };
      
  return (
    <div>
      <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
      <textarea
       placeholder="location?"
       value={location}
       className="form-input col-12 col-md-9"
       onChange={handleChange}
      ></textarea>
      <input
       placeholder="cost?"
       value={cost} 
       type="number"    
       className="form-input col-12 col-md-9"
       onChange={handleChange4}
      ></input>
      <textarea
       placeholder="POI?"
       value={pointsOfInterest}
       className="form-input col-12 col-md-9"
       onChange={handleChange2}
      ></textarea>
      <textarea
       placeholder="Transport?"
       value={transport}
       className="form-input col-12 col-md-9"
       onChange={handleChange3}
      ></textarea>
      <textarea
       placeholder="Additional?"
       value={extra}
       className="form-input col-12 col-md-9"
       onChange={handleChange5}
      ></textarea>
      
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;