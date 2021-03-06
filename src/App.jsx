import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/header";
import StartPage from "./pages/start-page";
import ChatPage from "./pages/chat-page";

import io from "socket.io-client";

const socket = io("wss://addi-chat-server.herokuapp.com");

function App() {
  const [name, setName] = useState("");

  const submitName = (name) => {
    setName(name);
    socket.emit("new-user", name);
  };

  // component did mount
  useEffect(() => {
    // component did unmount
    return () => {
      socket.emit("disconnect");
    };
  }, []);

  return (
    <div className="App" style={{ height: "inherit" }}>
      <Header />
      <Switch>
        <Route exact path="/">
          <StartPage submitName={submitName} />
        </Route>
        <Route path="/chat">
          {!name ? (
            <Redirect to="/" />
          ) : (
            <ChatPage name={name} socket={socket} />
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
