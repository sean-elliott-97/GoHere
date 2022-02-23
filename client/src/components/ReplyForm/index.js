import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REPLY } from '../../utils/mutations';

const ReplyForm = ({ postId }) => {

    const [addReply, { error }] = useMutation(ADD_REPLY);


    const [replyBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const handleChange = event => {
    if (event.target.value.length <= 280) {
        setBody(event.target.value);
        setCharacterCount(event.target.value.length);
    }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
      
        try {
          // add post to database
          await addReply({
            variables: { replyBody, postId }
          });
      
          // clear form value
          setBody('');
          setCharacterCount(0);
        } catch (e) {
          console.error(e);
        }
      };


  return (
    <div>
      <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        character count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form className="reply-form"
      onSubmit={handleFormSubmit}>
        <textarea
          placeholder="leave a reply?"
          value={replyBody}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <button className="submit-green" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReplyForm;