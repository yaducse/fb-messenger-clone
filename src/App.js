import React, { useState, useEffect } from 'react';
import { FormControl, Input, IconButton } from '@material-ui/core';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase/app';
import './style.css';
import FlipMove from 'react-flip-move';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

export default function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(prompt('Please enter your name:'));
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(
          snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);

  const sendMessage = e => {
    e.preventDefault();
    db.collection('messages').add({
      text: input,
      username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput('');
  };
  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100" />
      <h2>Welcome {username}</h2>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <IconButton
            className="app__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendRoundedIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, data }) => (
          <Message key={id} username={username} message={data} />
        ))}
      </FlipMove>
    </div>
  );
}
