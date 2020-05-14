import React, { useState, useRef, useEffect } from 'react';
import { Article, Button } from 'react-weui';
import noteStore from '../../../storage/NoteStore';
import NoteFactory from './NoteFactory';

const NoteForm = () => {
  const textRef = useRef();
  const [content, setContent] = useState('');

  const handleChangeText = (event) => {
    setContent(event.target.value);
  };

  const handleSubmitNote = () => {
    if (content.length) {
      noteStore.add(NoteFactory.create(content));
      window.close();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      handleSubmitNote();
    }
  };
  
  useEffect(() => {
    textRef.current.focus();
  }, []);

  return (
    <Article className={'note-form'}>
      <textarea
        ref={textRef}
        value={content}
        onChange={handleChangeText}
        onKeyPress={handleKeyPress}
        placeholder="Enter your note"
        rows="5"
      />

      <div className="button-container">
        <Button size="small" onClick={handleSubmitNote} plain>
          Save Note (Enter)
        </Button>
      </div>
    </Article>
  );
};

export default NoteForm;
